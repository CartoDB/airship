import React from 'react';
import PropTypes from 'prop-types';
import Base from './base';

const Subheader = props => {
  const { as } = props;
  const Text = Base.withComponent(as || 'h1').extend`
    font-size: 16px;
    line-height: 24px;
  `;

  return <Text {...props}>{props.children}</Text>;
};

Subheader.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
};

export default Subheader;
