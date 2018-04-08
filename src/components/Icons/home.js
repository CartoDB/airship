import React from 'react';
import PropTypes from 'prop-types';

const HomeIcon = ({
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
    <path d="M15,9 L14,9 L14,15 L11,15 L11,11 L10,11 L6,11 L5,11 L5,15 L2,15 L2,9 L1,9 L1,16 L6,16 L6,12 L10,12 L10,16 L15,16 L15,10 L15,9 Z M16,7.99984733 L8,0.49005127 C8.07044591,0.466752116 5.40377925,2.97001747 0,7.99984733 L0,8.99984733 L0.581420898,8.99984733 L8,1.97497559 L15.4212036,8.99984733 L16,8.99984733 L16,7.99984733 Z M11,2 L13,2 L13,4 L14,4 L14,1 L11,1 L11,2 Z" />
  </svg>
);

HomeIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

export default HomeIcon;
