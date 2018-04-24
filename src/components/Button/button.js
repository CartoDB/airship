import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { darken, lighten } from 'polished';
import { theme } from '../../constants';

const font = props => {
  let font = "500 12px/20px 'Roboto'";

  if (props.large) {
    font = "500 16px/24px 'Roboto'";
  }

  if (props.small) {
    font = "400 10px/12px 'Roboto'";
  }

  return font;
};

const padding = props => {
  let padding = '6px 12px';
  if (props.large) {
    padding = '8px 16px';
  }
  if (props.small) {
    padding = '6px 8px';
  }
  return padding;
};

const background = props => (!!props.borderless || !!props.secondary
  ? 'transparent'
  : props.theme.brand01);

const radius = props => {
  const { radius } = props;

  return radius != null && typeof radius === 'number'
    ? `${props.radius}px`
    : '4px';
};

const color = props => (!!props.borderless || !!props.secondary
  ? props.theme.brand01
  : props.theme.white);

const border = props => (props.secondary ? `1px solid ${props.theme.brand01}` : 0);

const hover = props => (!!props.borderless || !!props.secondary
  ? lighten(0.45, props.theme.brand01)
  : darken(0.16, props.theme.brand01));

const focus = props => (!!props.borderless || !!props.secondary
  ? lighten(0.4, props.theme.brand01)
  : darken(0.24, props.theme.brand01));

const StyledButton = styled.button`
  border: ${border};
  box-shadow: none;
  border-radius: ${radius};
  background: ${background};
  color: ${color};
  cursor: pointer;
  padding: ${padding};
  font: ${font};
  display: flex;
  align-items: center;
  margin: 0;

  &[disabled],
  &.is-disabled {
    opacity: 0.24;
    cursor: default;
  }

  &:hover {
    background: ${hover};
  }

  &:focus {
    background: ${focus};
    outline: none;
  }

  &.is-disabled:hover,
  &.is-disabled:focus {
    background: ${background};
    color: ${color};
  }

  .button-media {
    margin: 0 -6px;
  }

  svg + * {
    margin-left: 8px;
  }
`;
StyledButton.defaultProps = {
  theme,
};

class Button extends Component {
  renderChildren() {
    return React.Children.map(this.props.children, child => {
      if (typeof child === 'string') return child;
      return React.cloneElement(child, { color: 'currentColor' });
    });
  }

  render() {
    const { children, ...other } = this.props;
    return (
      <StyledButton {...other} data-component="Button">
        {this.renderChildren()}
      </StyledButton>
    );
  }
}

Button.propTypes = {
  children: PropTypes.node,
  large: PropTypes.bool,
  small: PropTypes.bool,
  secondary: PropTypes.bool,
  borderless: PropTypes.bool,
  radius: PropTypes.number,
  grouped: PropTypes.bool,
};

export default Button;
