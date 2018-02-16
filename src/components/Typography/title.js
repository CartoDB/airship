import React from 'react';
import styled from 'styled-components';
import Base from './base';
import _ from 'lodash';

const Basic = styled.h1`
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
`;

const Title = (props) => {
  const extended = Object.assign({}, { basic: Basic }, _.omit(props, 'font'));
  const Content = Base(extended);
  return <Content>{props.children}</Content>;
};

export default Title;
