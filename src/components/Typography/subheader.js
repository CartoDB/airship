import React from 'react';
import Base from './base';
import _ from 'lodash';

const Subheader = (props) => {
  const { as } = props;
  const extended = _.omit(props, 'font', 'weight');
  const Text = Base.withComponent(as || 'h1').extend`
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
  `;
  return <Text {...extended}>{props.children}</Text>;
};

export default Subheader;
