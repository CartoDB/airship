import React from 'react';
import PropTypes from 'prop-types';

const ChevronRightIcon = ({
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
      <path d="M7.1237124,8.30988427 L0.123718398,0.780478575 C-0.058122473,0.584885024 -0.0370637371,0.287585208 0.170754401,0.116440851 C0.378572539,-0.0547035068 0.694453577,-0.034883519 0.876294448,0.160710032 L7.87628845,7.69011573 C8.04123718,7.86753958 8.04123718,8.13246042 7.87628845,8.30988427 L0.876294448,15.83929 C0.694453577,16.0348835 0.378572539,16.0547035 0.170754401,15.8835591 C-0.0370637371,15.7124148 -0.058122473,15.415115 0.123718398,15.2195214 L7.1237124,7.69011573 L7.1237124,8.30988427 Z" />
    </svg>
  );
};

ChevronRightIcon.propTypes = {
  width: PropTypes.oneOf([4, 6, 8, 16, 24]),
  height: PropTypes.oneOf([8, 12, 16, 32, 48]),
  color: PropTypes.string
};

export default ChevronRightIcon;
