import React from 'react';
import PropTypes from 'prop-types';

const AlertIcon = ({
  width = 16,
  height = 15,
  color = '#1785fb',
  ...others
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={color}
      {...others}
      viewBox="0 0 16 15"
    >
      <path d="M7.607 1.17L1.081 13.68c-.166.32-.166.32.19.32h12.757c.354 0 .355-.002.19-.32L7.692 1.17C7.6.991 7.571.97 7.65.97c.078 0 .05.021-.043.2zM6.72.708c.514-.984 1.345-.985 1.859 0l6.525 12.51c.514.984.028 1.782-1.076 1.782H1.27c-1.107 0-1.59-.797-1.076-1.782L6.72.708zM7 12v1h1v-1H7zm0-6v5h1V6H7z" />
    </svg>
  );
};

AlertIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string
};

export default AlertIcon;
