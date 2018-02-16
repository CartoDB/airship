import React from 'react';
import styled from 'styled-components';
import Base from './base';
import _ from 'lodash';

const Basic = styled.h1`
  font-weight: 300;
  font-size: 40px;
  line-height: 56px;
`;

const Display = (props) => {
  const extended = Object.assign(
    {},
    { basic: Basic },
    _.omit(props, 'font', 'weight')
  );
  const Content = Base(extended);
  return <Content>{props.children}</Content>;
};

export default Display;
