import React from 'react';
import PropTypes from 'prop-types';

const MenuIcon = ({
  width = 12, height = 9, color = '#1785fb', ...others
}) => (
  <svg
    width={width}
    height={height}
    fill={color}
    {...others}
    viewBox="0 0 12 9"
  >
    <path d="M0.5,0 L11.5,0 C11.7761424,0 12,0.223857625 12,0.5 C12,0.776142375 11.7761424,1 11.5,1 L0.5,1 C0.223857625,1 0,0.776142375 0,0.5 C0,0.223857625 0.223857625,0 0.5,0 Z M0.5,4 L11.5,4 C11.7761424,4 12,4.22385763 12,4.5 C12,4.77614237 11.7761424,5 11.5,5 L0.5,5 C0.223857625,5 0,4.77614237 0,4.5 C0,4.22385763 0.223857625,4 0.5,4 Z M0.5,8 L11.5,8 C11.7761424,8 12,8.22385763 12,8.5 C12,8.77614237 11.7761424,9 11.5,9 L0.5,9 C0.223857625,9 0,8.77614237 0,8.5 C0,8.22385763 0.223857625,8 0.5,8 Z" />
  </svg>
);

MenuIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

export default MenuIcon;
