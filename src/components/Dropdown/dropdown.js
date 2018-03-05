import React, { Component } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';
import PropTypes from 'prop-types';
import { colors, shadows, z } from '../../constants';
import { findDOMNode } from 'react-dom';

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
`;

const DropdownTrigger = (props) => {
  const { children, ...other } = props;
  return <TriggerWrapper {...other}>{children}</TriggerWrapper>;
};

DropdownTrigger.displayName = 'Dropdown.Trigger';

const DropdownContent = styled.div`
  background: ${colors.white};
  box-shadow: ${shadows.shadow8};
  display: inline-flex;
  left: 0;
  top: calc(100% + 5px);
  position: absolute;
  z-index: ${z.dropdowns};
`;
DropdownContent.displayName = 'Dropdown.Content';

const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  min-width: 200px;
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
  static Content = DropdownContent;
  static Menu = DropdownMenu;
  static Item = DropdownItem;
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
    const { children, action } = this.props;
    const Node = this.tagName;

    return (
      <Node data-component="Dropdown">
        {React.Children.map(children, (child) => {
          let element = null;
          if (child.type.displayName === 'Dropdown.Trigger') {
            element = React.cloneElement(child, {
              'data-component': 'Dropdown.Trigger',
              onClick: (e) => (action === 'click' ? this.toggle() : null),
              onMouseEnter: (e) => (action === 'over' ? this.show() : null),
              onMouseLeave: (e) => (action === 'over' ? this.tryToHide() : null)
            });
          } else if (child.type.displayName === 'Dropdown.Content' && active) {
            element = React.cloneElement(child, {
              'data-component': 'Dropdown.Content',
              onMouseEnter: (e) => (action === 'over' ? this.show() : null),
              onMouseLeave: (e) => (action === 'over' ? this.tryToHide() : null)
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
  as: PropTypes.oneOf(['div', 'span'])
};

export default Dropdown;
