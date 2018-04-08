import React, { Component, Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ChevronLeft from '../Icons/chevron-left';
import ChevronRight from '../Icons/chevron-right';

const Header = styled.div`
  display: flex;
  margin-bottom: 12px;

  button {
    border: 0;
    background: transparent;
    box-shadown: none;
    margin-left: auto;
    display: flex;
    align-items: center;
    outline: none;
  }
`;
Header.displayName = 'Steps.Header';

const StyledControl = styled.ul`
  display: flex;
  list-style: none;
  margin: 0 0 0 auto;
  padding: 0;
  align-items: center;
  font: 500 10px/12px 'Roboto';

  li + li {
    margin-left: 4px;
  }
`;

const Control = ({ up, down, children }) => (
  <StyledControl>
    <li>
      <button onClick={() => down()}>
        <ChevronLeft width={6} height={12} />
      </button>
    </li>
    <li>{children}</li>
    <li>
      <button onClick={() => up()}>
        <ChevronRight width={6} height={12} />
      </button>
    </li>
  </StyledControl>
);

Control.propTypes = {
  children: PropTypes.node,
  down: PropTypes.func,
  up: PropTypes.func,
};

const Content = ({ children }) => children;
Content.displayName = 'Steps.Content';

class Steps extends Component {
  static Header = Header;
  static Content = Content;

  state = {
    step: this.props.step || 0,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.step !== nextProps.step) {
      this.setState({ step: nextProps.step });
    }
  }

  up = () => {
    let { step } = this.state;
    this.change(step += 1);
  };

  down = () => {
    let { step } = this.state;
    this.change(step -= 1);
  };

  change = to => {
    const { onChange, children } = this.props;
    const content = Children.toArray(children).filter(
      child => child.type.displayName === 'Steps.Content'
    ).length;

    const next = to < content ? (to < 0 ? content - 1 : to) : 0; // eslint-disable-line

    this.setState(
      state => ({ ...state, step: next }),
      () => onChange && onChange(this.state),
    );
  };

  render() {
    let { step } = this.state;
    const { children } = this.props;
    const content = Children.toArray(children).filter(
      child => child.type.displayName === 'Steps.Content'
    );
    const current = content.filter((child, index) => index === step);

    return (
      <div>
        {Children.map(children, child => {
          if (child.type.displayName === 'Steps.Header') {
            return (
              <Steps.Header>
                <div>{child.props.children}</div>
                <Control up={this.up} down={this.down}>
                  {/* TODO: Why ++step? */}
                  {/* eslint-disable-next-line */}
                  {++step} / {content.length}
                </Control>
              </Steps.Header>
            );
          }

          return null;
        })}

        {current}
      </div>
    );
  }
}

Steps.defaultProps = {
  step: 0,
};

Steps.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  step: PropTypes.number,
};

export default Steps;
