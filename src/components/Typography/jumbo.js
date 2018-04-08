import React from 'react';
import PropTypes from 'prop-types';
import Base from './base';

const Jumbo = props => {
  const { as, children, font, weight, ...others } = props;

  const Text = Base.withComponent(as || 'h1').extend`
    font-weight: 300;
    font-size: 72px;
    line-height: 80px;
  `;

  return <Text {...others}>{children}</Text>;
};

Jumbo.propTypes = {
  font: PropTypes.string,
  weight: PropTypes.number,
  as: PropTypes.string,
  children: PropTypes.node,
};

export default Jumbo;
