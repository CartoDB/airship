import React from 'react';
import PropTypes from 'prop-types';
import Base from './base';

const Text = props => {
  const { as } = props;
  const Text = Base.withComponent(as || 'p').extend`
    font-size: 12px;
    line-height: ${props => (props.font === 'mono' ? '16px' : '20px')};
  `;
  return <Text {...props}>{props.children}</Text>;
};

Text.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  font: PropTypes.string,
};

export default Text;
