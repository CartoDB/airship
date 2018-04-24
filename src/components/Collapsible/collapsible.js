import React, { Component, Children } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { isComponentOfType } from '../../utils';
import Icon from '../Icon/icon';

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
          if (isComponentOfType(Collapsible.Header, child)) {
            return (
              <Collapsible.Header>
                <div>{child.props.children}</div>
                <button onClick={() => this.toggle()} >
                  <Icon icon={open ? 'chevron_up' : 'chevron_down'} />
                </button>
              </Collapsible.Header>
            );
          } else if (isComponentOfType(Collapsible.Content, child) && open) {
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
