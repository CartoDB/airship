import React from 'react';
import PropTypes from 'prop-types';

const AlertFillIcon = ({
  width = 16,
  height = 15,
  color = '#1785fb',
  ...others
}) => (
  <svg
    width={width}
    height={height}
    fill={color}
    {...others}
    viewBox="0 0 16 15"
  >
    <path d="M6.72032497,0.707591795 C7.23355392,-0.276368434 8.06537876,-0.276912364 8.57889142,0.707591795 L15.10446,13.2183824 C15.617689,14.2023426 15.1322082,15 14.0277536,15 L1.27146279,15 C0.163585301,15 -0.318756294,14.2028866 0.194756371,13.2183824 L6.72032497,0.707591795 Z M7,12 L7,13 L8,13 L8,12 L7,12 Z M7,6 L7,11 L8,11 L8,6 L7,6 Z" />
  </svg>
);

AlertFillIcon.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
};

export default AlertFillIcon;
