import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { darken } from 'polished';
import Button from './button';
import { isComponentOfType } from '../../utils';
import { colors } from '../../constants';

const separator = (props) => {
  return `1px solid ${
    !!props.secondary ? colors.primaryColor : darken(0.16, colors.primaryColor)
  }`;
};

const StyledList = styled.ul`
  border: 1px solid ${colors.primaryColor};
  border-radius: 4px;
  display: inline-flex;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

const StyledListItem = styled.li`
  border-right: ${separator};
  display: flex;

  &:last-child {
    border-right: 0;
  }
`;

class ButtonGroup extends Component {
  render() {
    const { children, secondary, ...other } = this.props;
    const buttons = React.Children.map(children, (child) => {
      return (
        <StyledListItem secondary={secondary}>
          {isComponentOfType(Button, child)
            ? React.cloneElement(child, {
                radius: 0,
                grouped: true,
                borderless: !!secondary,
                secondary: false
              })
            : child}
        </StyledListItem>
      );
    });

    return (
      <StyledList {...other} data-component="ButtonGroup">
        {buttons}
      </StyledList>
    );
  }
}

ButtonGroup.propTypes = {
  secondary: PropTypes.bool
};

export default ButtonGroup;
