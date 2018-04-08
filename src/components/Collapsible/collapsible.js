import React, { Component, Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PlusIcon from '../Icons/plus';
import MinusIcon from '../Icons/minus';

/*
  <Collapsible>
    <Collapsible.Header>Header</Collapsible.Header>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible>
*/

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
Header.displayName = 'Collapsible.Header';

const Content = ({ children }) => children;
Content.displayName = 'Collapsible.Content';

class Collapsible extends Component {
  static Header = Header;
  static Content = Content;

  state = {
    open: !!this.props.open,
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.open !== nextProps.open) {
      this.setState({ open: nextProps.open });
    }
  }

  toggle = () => {
    const { onChange } = this.props;

    this.setState(
      state => ({
        ...state,
        open: !state.open,
      }),
      () => onChange && onChange(this.state)
    );
  };

  render() {
    const { open } = this.state;
    const { children } = this.props;

    return (
      <div>
        {Children.map(children, child => {
          if (child.type.displayName === 'Collapsible.Header') {
            return (
              <Collapsible.Header>
                <div>{child.props.children}</div>
                <button onClick={() => this.toggle()} >
                  {open ? <MinusIcon /> : <PlusIcon />}
                </button>
              </Collapsible.Header>
            );
          } else if (child.type.displayName === 'Collapsible.Content' && open) {
            return child;
          }
        })}
      </div>
    );
  }
}

Collapsible.defaultProps = {
  open: true,
};

Collapsible.propTypes = {
  children: PropTypes.node,
  onChange: PropTypes.func,
  open: PropTypes.bool,
};

export default Collapsible;
