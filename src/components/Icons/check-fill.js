import React from 'react';
import PropTypes from 'prop-types';

const CheckFillIcon = ({
  width = 16,
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
      viewBox="0 0 16 16"
    >
      <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zM4.864 7.693a.5.5 0 0 0-.728.686l2.323 2.464a.5.5 0 0 0 .729-.001l4.677-5a.5.5 0 0 0-.73-.684L6.82 9.77 4.864 7.693z" />
    </svg>
  );
};

CheckFillIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string
};

export default CheckFillIcon;
