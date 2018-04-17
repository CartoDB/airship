import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { darken } from 'polished';
import Button from './button';
import { isComponentOfType } from '../../utils';
import { theme } from '../../constants';

const separator = props => `1px solid ${
  props.secondary ? props.theme.brand01 : darken(0.16, props.theme.brand01)
}`;

const StyledList = styled.ul`
  border: 1px solid ${props => props.theme.brand01};
  border-radius: 4px;
  display: inline-flex;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;
StyledList.defaultProps = {
  theme,
};

const StyledListItem = styled.li`
  border-right: ${separator};
  display: flex;

  &:last-child {
    border-right: 0;
  }
`;
StyledListItem.defaultProps = {
  theme,
};

class ButtonGroup extends Component {
  render() {
    const { children, secondary, ...other } = this.props;
    const buttons = React.Children.map(children, child => (
      <StyledListItem secondary={secondary}>
        {isComponentOfType(Button, child)
            ? React.cloneElement(child, {
                ...child.props,
                radius: 0,
                grouped: true,
                borderless: !!secondary,
                secondary: false,
              })
            : child}
      </StyledListItem>
    ));

    return (
      <StyledList {...other} data-component="ButtonGroup">
        {buttons}
      </StyledList>
    );
  }
}

ButtonGroup.propTypes = {
  children: PropTypes.node,
  secondary: PropTypes.bool,
};

export default ButtonGroup;
