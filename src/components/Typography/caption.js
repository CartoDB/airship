import React from 'react';
import Base from './base';

const Caption = (props) => {
  const { as } = props;
  const Text = Base.withComponent(as || 'p').extend`
    font-size: 10px;
    line-height: 12px;
  `;
  return <Text {...props}>{props.children}</Text>;
};

export default Caption;
