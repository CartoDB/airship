import React from 'react';
import PropTypes from 'prop-types';

const PointsIcon = ({
  width = 2,
  height = 14,
  color = '#1785fb',
  ...others
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={color}
      {...others}
      viewBox="0 0 2 14"
    >
      <path d="M0,0 L2,0 L2,2 L0,2 L0,0 L0,0 Z M0,6 L2,6 L2,8 L0,8 L0,6 L0,6 Z M0,12 L2,12 L2,14 L0,14 L0,12 L0,12 Z" />
    </svg>
  );
};

PointsIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string
};

export default PointsIcon;
