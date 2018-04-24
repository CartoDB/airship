import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, ICONS } from '../../constants';

const ICON_LIST = Object.keys(ICONS).map(icon => icon.toLowerCase());

const Svg = styled.svg.attrs({
  viewBox: '0 0 16 16',
})`
  display: inline-flex;
  align-items: center;
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

const Icon = ({ path, icon, ...others }) => {
  const iconPath = path || ICONS[icon.toUpperCase()];

  return (
    <Svg {...others}>
      <path d={iconPath} />
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
  icon: 'info',
  size: 16,
};

export default Icon;
