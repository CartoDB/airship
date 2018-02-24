import React from 'react';
import PropTypes from 'prop-types';

const PlusIcon = ({ width = 16, height = 16, color = '#1785fb' }) => {
  return (
    <svg width={width} height={height} fill={color} viewBox="0 0 15 15">
      <polygon points="0.020904541 7.00476178 7.01217651 7.00476178 7.06573917 0.0133888789 8.00093254 0.0133888789 8.00093254 7.00476178 15.0067139 7.00476178 15.0067139 8.00007932 8.00093254 8.00007932 8.00093254 14.9849872 7.01217651 14.9849872 7.01217651 8.00007932 0.020904541 8.00007932" />
    </svg>
  );
};

PlusIcon.propTypes = {
  height: PropTypes.oneOf([12, 16, 32, 48]),
  width: PropTypes.oneOf([12, 16, 32, 48]),
  color: PropTypes.string
};

export default PlusIcon;
