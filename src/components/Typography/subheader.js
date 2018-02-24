import React from 'react';
import Base from './base';

const Subheader = (props) => {
  const { as } = props;
  const Text = Base.withComponent(as || 'h1').extend`
    font-size: 16px;
    line-height: 24px;
  `;
  return <Text {...props}>{props.children}</Text>;
};

export default Subheader;
