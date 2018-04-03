import React from 'react';
import Base from './base';

const Title = (props) => {
  const { as, children, font, ...others } = props;

  const Text = Base.withComponent(as || 'h1').extend`
    font-size: 24px;
    line-height: 32px;
  `;

  return <Text {...others}>{children}</Text>;
};

export default Title;
