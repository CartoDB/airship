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

const Control = ({ up, down, children }) => {
  return (
    <StyledControl>
      <li>
        <button
          onClick={(e) => {
            down();
          }}
        >
          <ChevronLeft width={6} height={12} />
        </button>
      </li>
      <li>{children}</li>
      <li>
        <button
          onClick={(e) => {
            up();
          }}
        >
          <ChevronRight width={6} height={12} />
        </button>
      </li>
    </StyledControl>
  );
};

const Content = ({ children, ...props }) => {
  return children;
};
Content.displayName = 'Steps.Content';

class Steps extends Component {
  static Header = Header;
  static Content = Content;

  state = {
    step: this.props.step || 0
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.step !== nextProps.step) {
      this.setState({ step: nextProps.step });
    }
  }

  up = () => {
    let { step } = this.state;
    this.change(++step);
  };

  down = () => {
    let { step } = this.state;
    this.change(--step);
  };

  change = (to) => {
    const { onChange, children } = this.props;
    const content = Children.toArray(children).filter(
      (child) => child.type.displayName === 'Steps.Content'
    ).length;

    const next = to < content ? (to < 0 ? content - 1 : to) : 0;

    this.setState(
      (state) => {
        return {
          ...state,
          step: next
        };
      },
      () => {
        onChange && onChange(this.state);
      }
    );
  };

  render() {
    let { step } = this.state;
    const { children } = this.props;
    const content = Children.toArray(children).filter(
      (child) => child.type.displayName === 'Steps.Content'
    );
    const current = content.filter((child, index) => index === step);

    return (
      <div>
        {Children.map(children, (child, index) => {
          if (child.type.displayName === 'Steps.Header') {
            return (
              <Steps.Header>
                <div>{child.props.children}</div>
                <Control up={this.up} down={this.down}>
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
  step: 0
};

Steps.propTypes = {
  step: PropTypes.number,
  onChange: PropTypes.func
};

export default Steps;
