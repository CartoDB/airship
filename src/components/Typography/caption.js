import React from 'react';
import PropTypes from 'prop-types';
import Base from './base';

const Caption = props => {
  const { as } = props;
  const Text = Base.withComponent(as || 'p').extend`
    font-size: 10px;
    line-height: 12px;
  `;

  return <Text {...props}>{props.children}</Text>;
};

Caption.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
};

export default Caption;
