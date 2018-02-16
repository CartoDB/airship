import React from 'react';
import Base from './base';
import _ from 'lodash';

const Jumbo = (props) => {
  const { as } = props;
  const extended = _.omit(props, 'font', 'weight');
  const Text = Base.withComponent(as || 'h1').extend`
    font-weight: 300;
    font-size: 72px;
    line-height: 80px;
  `;
  return <Text {...extended}>{props.children}</Text>;
};

export default Jumbo;
