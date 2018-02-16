import React from 'react';
import Base from './base';
import _ from 'lodash';

const Title = (props) => {
  const { as } = props;
  const extended = _.omit(props, 'font');
  const Text = Base.withComponent(as || 'h1').extend`
    font-weight: 400;
    font-size: 24px;
    line-height: 32px;
  `;
  return <Text {...extended}>{props.children}</Text>;
};

export default Title;
