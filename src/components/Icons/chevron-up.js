import React from 'react';
import PropTypes from 'prop-types';

const ChevronUpIcon = ({
  width = 16,
  height = 8,
  color = '#1785fb',
  ...others
}) => (
  <svg
    width={width}
    height={height}
    fill={color}
    {...others}
    viewBox="0 0 16 8"
  >
    <path d="M7.69011573,0.876287597 L8.30988427,0.876287597 L0.780478575,7.8762816 C0.584885024,8.05812247 0.287585208,8.03706374 0.116440851,7.8292456 C-0.0547035068,7.62142746 -0.034883519,7.30554642 0.160710032,7.12370555 L7.69011573,0.123711547 C7.86753958,-0.0412371822 8.13246042,-0.0412371822 8.30988427,0.123711547 L15.83929,7.12370555 C16.0348835,7.30554642 16.0547035,7.62142746 15.8835591,7.8292456 C15.7124148,8.03706374 15.415115,8.05812247 15.2195214,7.8762816 L7.69011573,0.876287597 Z" />
  </svg>
);

ChevronUpIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

export default ChevronUpIcon;
