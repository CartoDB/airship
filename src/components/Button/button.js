import React, { Component } from 'react';
import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { colors } from '../../constants';

const font = (props) => {
  let font = "500 12px/20px 'Roboto'";
  if (props.large) {
    font = "500 16px/24px 'Roboto'";
  }
  if (props.small) {
    font = "400 10px/12px 'Roboto'";
  }
  return font;
};

const padding = (props) => {
  let padding = '6px 12px';
  if (props.large) {
    padding = '8px 16px';
  }
  if (props.small) {
    padding = '6px 8px';
  }
  return padding;
};

const background = (props) => {
  return !!props.borderless || !!props.secondary
    ? 'transparent'
    : colors.primaryColor;
};

const radius = (props) => {
  return !!props.borderless ? 0 : '4px';
};

const color = (props) => {
  return !!props.borderless || !!props.secondary
    ? colors.primaryColor
    : colors.white;
};

const border = (props) => {
  return !!props.secondary ? `1px solid ${colors.primaryColor}` : 0;
};

const hover = (props) => {
  return !!props.borderless || !!props.secondary
    ? lighten(0.45, colors.primaryColor)
    : darken(0.16, colors.primaryColor);
};

const focus = (props) => {
  return !!props.borderless || !!props.secondary
    ? lighten(0.4, colors.primaryColor)
    : darken(0.24, colors.primaryColor);
};

const size = (props) => {
  return !!props.large ? 16 : 12;
};

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
  }

  &.is-disabled:hover,
  &.is-disabled:focus {
    background: ${background};
    color: ${color};
  }

  svg {
    &:only-child {
      margin: 0 -6px;
    }
  }

  svg + * {
    margin-left: 8px;
  }
`;

class Button extends Component {
  renderChildren() {
    const { props } = this;
    return React.Children.map(props.children, (child) => {
      return typeof child === 'string' ? (
        <span>{child}</span>
      ) : (
        // what if it's not svg?
        React.cloneElement(child, {
          className: 'button-media',
          color: color(props),
          width: size(props),
          height: size(props)
        })
      );
    });
  }

  render() {
    return (
      <StyledButton {...this.props} data-component="Button">
        {this.renderChildren()}
      </StyledButton>
    );
  }
}
export default Button;
