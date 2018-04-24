import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { theme } from '../../constants';

const font = props => {
  let font = "400 12px/20px 'Roboto'";
  if (props.large) {
    font = "400 16px/24px 'Roboto'";
  }
  return font;
};

const shadow = props => (props.large ? '-4px' : '-2px');

const TabList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  box-shadow: inset 0 -1px 0 0 ${props => props.theme.ui03};
`;
TabList.defaultProps = {
  theme,
};

const TabButton = styled.button`
  border: 0;
  background-color: transparent;
  color: ${props => props.theme.brand01};
  font: ${font};
  padding: 8px;
  cursor: pointer;
  margin: 0;

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: inset 0 ${shadow} 0 0 ${props => props.theme.brand03};
  }

  ${props => props.selected && css`
    &,
    &:hover {
      box-shadow: inset 0 ${shadow} 0 0 ${props => props.theme.type01};
      color: ${props => props.theme.type01};
    }
  `};
`;
TabButton.displayName = 'TabButton';
TabButton.defaultProps = {
  theme,
};

const Tabpanel = ({ children, selected }) => (selected ? <div>{children}</div> : null);

Tabpanel.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};
Tabpanel.displayName = 'Tabpanel';

class Tabs extends Component {
  static Panel = Tabpanel;

  static defaultProps = {
    selected: 0,
  };

  initialState = {
    selected: this.props.selected,
  };

  state = this.initialState;

  componentDidMount() {
    const { selected } = this.props;

    if (typeof selected === 'string') {
      this.setSelected(selected);
    }
  }

  getNavigation() {
    return React.Children.map(this.props.children, child => child.props.label);
  }

  setSelected = label => {
    const index = this.getNavigation().indexOf(label);
    const { onChange } = this.props;

    if (index === this.state.selected) return;

    this.setState(
      state => ({ ...state, selected: index }),
      () => onChange && onChange(this.state),
    );
  };

  render() {
    const { selected } = this.state;
    const { children, large } = this.props;

    return (
      <div>
        <TabList>
          {this.getNavigation().map((label, index) => (
            <li key={label}>
              <TabButton
                onClick={() => this.setSelected(label)}
                large={large}
                selected={selected === index}
              >
                {label}
              </TabButton>
            </li>
          ))}
        </TabList>

        {React.Children.map(children, (child, i) => React.cloneElement(child, {
            selected: i === selected,
          }))}
      </div>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.node,
  large: PropTypes.bool,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

export default Tabs;
