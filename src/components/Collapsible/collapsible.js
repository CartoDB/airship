import React, { Component, Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import PlusIcon from '../Icons/plus';
import CloseIcon from '../Icons/close';

/*
  <Collapsible>
    <Collapsible.Header>Header</Collapsible.Header>
    <Collapsible.Content>Content</Collapsible.Content>
  </Collapsible>
*/

const Header = styled.div`
  display: flex;

  & button {
    border: 0;
    background: transparent;
    box-shadown: none;
    margin-left: auto;
  }
`;
Header.displayName = 'Collapsible.Header';

const Content = ({ children, ...props }) => {
  return children;
};
Content.displayName = 'Collapsible.Content';

class Collapsible extends Component {
  static Header = Header;
  static Content = Content;

  state = {
    open: true
  };

  toggle = () => {
    const { onChange } = this.props;

    this.setState(
      (state) => {
        return {
          ...state,
          open: !state.open
        };
      },
      () => {
        onChnage && onChnage(this.state);
      }
    );
  };

  render() {
    const { open } = this.state;
    const { children } = this.props;

    return (
      <div>
        {Children.map(children, (child) => {
          if (child.type.displayName === 'Collapsible.Header') {
            return (
              <Collapsible.Header>
                <div>{child.props.children}</div>
                <button
                  onClick={(e) => {
                    this.toggle();
                  }}
                >
                  {open ? <PlusIcon /> : <CloseIcon />}
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

Collapsible.propTypes = {
  onChange: PropTypes.func
};

export default Collapsible;
