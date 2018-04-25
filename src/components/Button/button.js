import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { darken, lighten } from 'polished';
import { theme } from '../../constants';

const font = props => {
  if (props.large) return "500 16px/24px 'Roboto'";
  if (props.small) return "400 10px/12px 'Roboto'";

  return "500 12px/20px 'Roboto'";
};

const padding = props => {
  if (props.large) return '8px 16px';
  if (props.small) return '6px 8px';

  return '6px 12px';
};

const background = props => (!!props.borderless || !!props.secondary
  ? 'transparent'
  : props.theme.brand01);

const color = props => (!!props.borderless || !!props.secondary
  ? props.theme.brand01
  : props.theme.white);

const hover = props => (!!props.borderless || !!props.secondary
  ? lighten(0.40, props.theme.brand01)
  : darken(0.16, props.theme.brand01));

const focus = props => (!!props.borderless || !!props.secondary
  ? lighten(0.4, props.theme.brand01)
  : darken(0.24, props.theme.brand01));

const Button = styled.button`
  -webkit-font-smoothing: antialiased;
  align-items: center;
  background: ${background};
  border-radius: 4px;
  border: ${props => (props.secondary ? `1px solid ${props.theme.brand01}` : 0)};
  box-shadow: none;
  color: ${color};
  cursor: pointer;
  display: inline-flex;
  font: ${font};
  margin: 0;
  padding: ${padding};
  transition: background 0.2s ease;

  ${props => props.grouped && css`
    border-radius: 0;

    &:not(:last-child) {
      border-right: none;
    }

    &:first-child {
      border-radius: 4px 0 0 4px;
    }

    &:last-child {
      border-radius: 0 4px 4px 0;
    }
  `}

  &:hover {
    background: ${hover};
  }

  &:focus {
    background: ${focus};
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.24;

    &:hover,
    &:focus {
      background: ${background};
      color: ${color};
    }
  }

  svg {
    fill: currentColor;
  }
`;

Button.defaultProps = {
  theme,
};

Button.propTypes = {
  children: PropTypes.node,
  large: PropTypes.bool,
  small: PropTypes.bool,
  secondary: PropTypes.bool,
  borderless: PropTypes.bool,
  grouped: PropTypes.bool,
};

export default Button;
