import React from 'react';
import PropTypes from 'prop-types';

const ChevronDownIcon = ({
  width = 16,
  height = 8,
  color = '#1785fb',
  ...others
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={color}
      {...others}
      viewBox="0 0 16 8"
    >
      <path d="M8.30988427,7.1237124 L7.69011573,7.1237124 L15.2195214,0.123718398 C15.415115,-0.058122473 15.7124148,-0.0370637371 15.8835591,0.170754401 C16.0547035,0.378572539 16.0348835,0.694453577 15.83929,0.876294448 L8.30988427,7.87628845 C8.13246042,8.04123718 7.86753958,8.04123718 7.69011573,7.87628845 L0.160710032,0.876294448 C-0.034883519,0.694453577 -0.0547035068,0.378572539 0.116440851,0.170754401 C0.287585208,-0.0370637371 0.584885024,-0.058122473 0.780478575,0.123718398 L8.30988427,7.1237124 Z" />
    </svg>
  );
};

ChevronDownIcon.propTypes = {
  color: PropTypes.string
};

export default ChevronDownIcon;
