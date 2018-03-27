import React from 'react';
import PropTypes from 'prop-types';

const SettingsIcon = ({
  width = 14,
  height = 12,
  color = '#1785fb',
  ...others
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={color}
      {...others}
      viewBox="0 0 14 12"
    >
      <g>
        <path d="M4.5 11a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
        <path d="M0 9h3v1H0zM6 9h8v1H6zM0 2h8v1H0V2zm11 0h3v1h-3V2z" />
        <path d="M9.5 4a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm0 1a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
      </g>
    </svg>
  );
};

SettingsIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string
};

export default SettingsIcon;
