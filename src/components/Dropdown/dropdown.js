import React, { Component } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import PropTypes from 'prop-types';
import { colors, shadows } from '../../constants';
import ReactDOM, { findDOMNode } from 'react-dom';
import { offset } from '../../utils';

/*
  <Dropdown>
    <Dropdown.Trigger>Click me</Dropdown.Trigger>
    <Dropdown.Content>
      <Dropdown.Menu>
        <Dropdown.Item>All</Dropdown.Item>
        <Dropdown.Item>Open</Dropdown.Item>
        <Dropdown.Item>Fullfilled</Dropdown.Item>
        <Dropdown.Item>Close</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown.Content>
  </Dropdown>
*/

const TriggerWrapper = styled.div`
  display: inline-flex;
  width: ${(props) => props.size ? `${props.size}px` : 'auto'};
`;

class DropdownTrigger extends Component {
  render() {
    const { children, ...other } = this.props;
    return <TriggerWrapper {...other}>{children}</TriggerWrapper>;
  }
}

DropdownTrigger.displayName = 'Dropdown.Trigger';

const DropdownButton = styled.button`
  appearance: none;
  background-color: ${colors.white};
  border-radius: 4px;
  border: 1px solid ${rgba(colors.type01, 0.16)};
  display: inline-flex;
  align-items: center;
  font: 400 12px/18px 'Roboto';
  color: ${colors.type01};
  padding: 6px 12px;
  width: 100%;
  outline: none;

  &:focus {
    border: 1px solid ${colors.brand01};
    box-shadow: 0 0 0 1px ${colors.brand01};
  }

  svg {
    margin-left: auto;
  }
`;

const DropdownContent = styled.div`
  background: ${colors.white};
  box-shadow: ${shadows.shadow8};
  display: inline-flex;
  left: ${(props) => `${props.position.left}px`};
  top: ${(props) => `${props.position.top + props.position.height + 5}px`};
  position: absolute;
  width: ${(props) => props.size ? `${props.size}px` : 'auto'};
  min-width: 200px;
`;

const Content = ({ children, node, ...props }) => {
  let domNode = document.getElementById('modals');
  if (!domNode) {
    domNode = document.createElement('div');
    domNode.setAttribute('id', 'modals');
    document.body.appendChild(domNode);
  }

  const position = offset(node);

  return ReactDOM.createPortal(
    <DropdownContent position={position} {...props}>
      {children}
    </DropdownContent>,
    domNode
  );
};
Content.displayName = 'Dropdown.Content';

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  width: 100%;
  padding: 1px 0 0;
  position: relative;
`;

const StyledListItem = styled.li`
  border: 1px solid ${colors.grey};
  margin-top: -1px;
  overflow: hidden;

  &:first-child {
    border-radius: 4px 4px 0 0;
  }

  &:last-child {
    border-radius: 0 0 4px 4px;
  }

  &:hover {
    border: 1px solid ${rgba(colors.complementaryColor, 0.5)};
    z-index: 1;
  }
`;

const DropdownItem = styled.button`
  border: 0;
  background: ${colors.white};
  color: ${colors.black};
  font: 400 12px/20px 'Roboto';
  padding: 12px;
  width: 100%;
  text-align: left;

  &:focus,
  &:hover {
    background: ${rgba(colors.complementaryColor, 0.16)}; {
    outline: none;
  }
`;
DropdownItem.displayName = 'Dropdown.Item';

const DropdownMenu = ({ children, ...other }) => {
  const items = React.Children.map(children, (child) => {
    return <StyledListItem>{child}</StyledListItem>;
  });

  return <StyledList>{items}</StyledList>;
};
DropdownMenu.displayName = 'Dropdown.Menu';

const DropdownWrapper = styled.div`
  position: relative;
`;

class Dropdown extends Component {
  static Trigger = DropdownTrigger;
  static Content = Content;
  static Menu = DropdownMenu;
  static Item = DropdownItem;
  static Button = DropdownButton;

  static Timeout = 500;

  state = {
    active: false
  };

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.tagName = DropdownWrapper.withComponent(props.as);
  }

  componentDidMount() {
    this.timer = null;
    window.addEventListener('click', this.onWindowClick);
    window.addEventListener('touchstart', this.onWindowClick);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
    window.removeEventListener('touchstart', this.onWindowClick);
  }

  onWindowClick = (event) => {
    const dropdownElement = findDOMNode(this);
    const { active } = this.state;

    if (
      event.target !== dropdownElement &&
      dropdownElement !== event.target.closest('[data-component=Dropdown]') &&
      active
    ) {
      this.hide();
    }
  };

  updateTo = (to) => {
    this.setState((state) => {
      return { ...state, active: to };
    });
  };

  toggle = () => {
    const to = !this.state.active;
    this.updateTo(to);
  };

  show = () => {
    clearTimeout(this.timer);
    this.updateTo(true);
  };

  tryToHide = () => {
    this.timer = setTimeout(this.hide, Dropdown.Timeout);
  };

  hide = () => {
    this.updateTo(false);
  };

  render() {
    const { active } = this.state;
    const { children, action, size } = this.props;
    const Node = this.tagName;

    return (
      <Node
        data-component="Dropdown"
        innerRef={(node) => {
          this.node = node;
        }}
      >
        {React.Children.map(children, (child) => {
          let element = null;
          if (child.type.displayName === 'Dropdown.Trigger') {
            element = React.cloneElement(child, {
              'data-component': 'Dropdown.Trigger',
              onClick: (e) => (action === 'click' ? this.toggle() : null),
              onMouseEnter: (e) => (action === 'over' ? this.show() : null),
              onMouseLeave: (e) =>
                action === 'over' ? this.tryToHide() : null,
              size: size
            });
          } else if (child.type.displayName === 'Dropdown.Content' && active) {
            element = React.cloneElement(child, {
              'data-component': 'Dropdown.Content',
              node: this.node,
              onMouseEnter: (e) => (action === 'over' ? this.show() : null),
              onMouseLeave: (e) =>
                action === 'over' ? this.tryToHide() : null,
              size: size
            });
          }
          return element;
        })}
      </Node>
    );
  }
}

Dropdown.defaultProps = {
  action: 'click',
  as: 'div'
};

Dropdown.propTypes = {
  action: PropTypes.oneOf(['over', 'click']),
  as: PropTypes.oneOf(['div', 'span']),
  size: PropTypes.number
};

export default Dropdown;
