import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { colors } from '../../constants';
/*
  <Tabs>
    <Tabs.Panel label="wadus">
      Hola
    </Tabs.Panel>
    <Tabs.Panel label="world">
      Mundo
    </Tabs.Panel>
  </Tabs>
*/

const font = props => {
  let font = "400 12px/20px 'Roboto'";
  if (props.large) {
    font = "400 16px/24px 'Roboto'";
  }
  return font;
};

const shadow = props => (props.large ? '-4px' : '-2px');

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
  box-shadow: inset 0 -1px 0 0 ${colors.grey};
`;

const StyledButton = styled.button`
  border: 0;
  background-color: transparent;
  color: ${colors.primaryColor};
  font: ${font};
  padding: 8px;

  &:focus {
    outline: none;
  }

  &:hover {
    box-shadow: inset 0 ${shadow} 0 0 ${colors.complementaryColor};
  }

  &.is-selected,
  &.is-selected:hover {
    box-shadow: inset 0 ${shadow} 0 0 ${colors.black};
    color: ${colors.black};
  }
`;
StyledButton.displayName = 'StyledButton';

const Tabpanel = ({ children, selected }) => (selected ? <div>{children}</div> : null);

Tabpanel.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};
Tabpanel.displayName = 'Tabpanel';

class Tabs extends Component {
  static defaultProps = {
    selected: 0,
  };
  initialState = {
    selected: this.props.selected,
  };
  state = this.initialState;

  static Panel = Tabpanel;

  constructor(props) {
    super(props);
    this.navigation = this.buildNavigation();
  }

  componentDidMount() {
    const { selected } = this.props;

    if (typeof selected === 'string') {
      this.setSelected(selected);
    }
  }

  buildNavigation() {
    const { children } = this.props;
    return React.Children.map(children, child => child.props.label);
  }

  setSelected = label => {
    const index = this.navigation.indexOf(label);
    const { onChange } = this.props;
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
        <StyledList>
          {this.navigation.map((label, index) => {
            const css = selected === index ? 'is-selected' : '';
            return (
              <li key={label}>
                <StyledButton
                  className={css}
                  onClick={() => this.setSelected(label)}
                  large={large}
                >
                  {label}
                </StyledButton>
              </li>
            );
          })}
        </StyledList>
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
