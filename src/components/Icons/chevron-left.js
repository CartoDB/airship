import React from 'react';
import PropTypes from 'prop-types';

const ChevronLeftIcon = ({
  width = 8,
  height = 16,
  color = '#1785fb',
  ...others
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={color}
      {...others}
      viewBox="0 0 8 16"
    >
      <path d="M0.876287597,8.30988427 L0.876287597,7.69011573 L7.8762816,15.2195214 C8.05812247,15.415115 8.03706374,15.7124148 7.8292456,15.8835591 C7.62142746,16.0547035 7.30554642,16.0348835 7.12370555,15.83929 L0.123711547,8.30988427 C-0.0412371822,8.13246042 -0.0412371822,7.86753958 0.123711547,7.69011573 L7.12370555,0.160710032 C7.30554642,-0.034883519 7.62142746,-0.0547035068 7.8292456,0.116440851 C8.03706374,0.287585208 8.05812247,0.584885024 7.8762816,0.780478575 L0.876287597,8.30988427 Z" />
    </svg>
  );
};

ChevronLeftIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string
};

export default ChevronLeftIcon;
