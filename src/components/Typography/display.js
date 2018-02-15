import React from 'react';
import styled from 'styled-components';
import Base from './base';

const Basic = styled.h1`
  font-family: 'Roboto', 'sans-serif';
  font-weight: 300;
  font-size: 40px;
  line-height: 56px;
`;

const Display = (props) => {
  const extended = Object.assign({}, { basic: Basic }, props);
  const Content = Base(extended);
  return <Content>{props.children}</Content>;
};

export default Display;
