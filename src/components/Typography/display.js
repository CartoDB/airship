import React from 'react';
import PropTypes from 'prop-types';
import Base from './base';

const Display = props => {
  const { as, children, font, weight, ...others } = props;
  const Text = Base.withComponent(as || 'h1').extend`
    font-weight: 300;
    font-size: 40px;
    line-height: 56px;
  `;

  return <Text {...others}>{children}</Text>;
};

Display.propTypes = {
  font: PropTypes.string,
  weight: PropTypes.number,
  as: PropTypes.string,
  children: PropTypes.node,
};

export default Display;
