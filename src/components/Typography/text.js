import React from 'react';
import Base from './base';

const Text = (props) => {
  const { as } = props;
  const Text = Base.withComponent(as || 'p').extend`
    font-weight: ${(props) => (props.font === 'mono' ? null : 400)};
    font-size: 12px;
    line-height: ${(props) => (props.font === 'mono' ? '16px' : '20px')};
  `;
  return <Text {...props}>{props.children}</Text>;
};

export default Text;
