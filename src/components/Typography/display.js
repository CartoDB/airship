import React from 'react';
import Base from './base';
import _ from 'lodash';

const Display = (props) => {
  const { as } = props;
  const extended = Object.assign({}, _.omit(props, 'font', 'weight'));
  const Text = Base.withComponent(as || 'h1').extend`
    font-weight: 300;
    font-size: 40px;
    line-height: 56px;
  `;
  return <Text {...extended}>{props.children}</Text>;
};

export default Display;
