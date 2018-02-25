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

const StyledList = styled.ul`
  list-style: none;
  display: flex;
  margin: 0;
  padding: 0;
`;

const StyledButton = styled.button`
  border: 0;
  background-color: ${colors.white};
`;

const Tabpanel = ({ children, selected }) => {
  return selected ? <div>{children}</div> : null;
};

Tabpanel.propTypes = {
  label: PropTypes.string.isRequired
};

class Tabs extends Component {
  static defaultProps = {
    selected: 0
  };
  initialState = {
    selected: this.props.selected
  };
  state = this.initialState;

  static Panel = Tabpanel;

  constructor(props) {
    super(props);
    this.navigation = this.buildNavigation();
  }

  buildNavigation() {
    const { children } = this.props;
    return React.Children.map(children, (child, i) => {
      return child.props.label;
    });
  }

  onClick = (e, label) => {
    const index = this.navigation.indexOf(label);
    this.setState(state => {
      return {
        ...state,
        selected: index
      };
    });
  };

  render() {
    const { selected } = this.state;
    const { children } = this.props;

    return (
      <div>
        <StyledList>
          {this.navigation.map((label, index) => {
            return (
              <li key={label}>
                <StyledButton onClick={e => this.onClick(e, label)}>
                  {label}
                </StyledButton>
              </li>
            );
          })}
        </StyledList>
        {React.Children.map(children, (child, i) => {
          return React.cloneElement(child, {
            selected: i === selected
          });
        })}
      </div>
    );
  }
}

export default Tabs;
