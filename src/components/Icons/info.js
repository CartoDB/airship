import React from 'react';
import PropTypes from 'prop-types';

const InfoIcon = ({
  width = 16,
  height = 16,
  color = '#1785fb',
  ...others
}) => (
  <svg
    width={width}
    height={height}
    fill={color}
    {...others}
    viewBox="0 0 16 16"
  >
    <path d="M11.5,11 L9,11 L9,6.5 C9,6.224 8.776,6 8.5,6 L6.5,6 C6.224,6 6,6.224 6,6.5 C6,6.776 6.224,7 6.5,7 L8,7 L8,11 L5.5,11 C5.224,11 5,11.224 5,11.5 C5,11.776 5.224,12 5.5,12 L11.5,12 C11.776,12 12,11.776 12,11.5 C12,11.224 11.776,11 11.5,11 Z" />
    <circle cx="8" cy="4" r="1" />
    <path
      d="M8,15 C11.8659932,15 15,11.8659932 15,8 C15,4.13400675 11.8659932,1 8,1 C4.13400675,1 1,4.13400675 1,8 C1,11.8659932 4.13400675,15 8,15 Z M8,16 C3.581722,16 0,12.418278 0,8 C0,3.581722 3.581722,0 8,0 C12.418278,0 16,3.581722 16,8 C16,12.418278 12.418278,16 8,16 Z"
      fillRule="nonzero"
    />
  </svg>
);

InfoIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

export default InfoIcon;
