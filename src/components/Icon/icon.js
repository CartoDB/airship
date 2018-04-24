import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, ICONS } from '../../constants';

export const ICON_LIST = [
  'twitter',
  'linkedin',
  'facebook',
  'magnify',
  'question',
  'points',
  'marker',
  'plus',
  'minus',
  'home',
  'pencil',
  'close',
  'tick',
  'tick_circle',
  'tick_circle_fill',
  'hamburguer',
  'arrow_up',
  'arrow_right',
  'arrow_down',
  'arrow_left',
  'alert',
  'alert_fill',
  'settings',
  'info',
  'undo',
  'redo',
  'chevron_up',
  'chevron_right',
  'chevron_down',
  'chevron_left',
];

const Svg = styled.svg.attrs({
  viewBox: '0 0 16 16',
})`
  display: inline-block;
  height: ${props => props.size}px;
  vertical-align: middle;
  width: ${props => props.size}px;

  path {
    fill: ${props => props.color || props.theme.brand01}
  }
`;
Svg.defaultProps = {
  theme,
};

const Icon = props => {
  const icon = props.path || ICONS[props.icon.toUpperCase()];

  return (
    <Svg {...props}>
      <path d={icon} />
    </Svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.oneOf(ICON_LIST),
  path: PropTypes.string,
  size: PropTypes.number,
  color: PropTypes.string,
};

Icon.defaultProps = {
  size: 16,
};

export default Icon;
