import React from 'react';
import styled from 'styled-components';
import Base from './base';

const Basic = styled.h1`
  font-family: 'Roboto', 'sans-serif';
  font-weight: 300;
  font-size: 72px;
  line-height: 80px;
`;

const Jumbo = (props) => {
  const extended = Object.assign({}, { basic: Basic }, props);
  const Content = Base(extended);
  return <Content>{props.children}</Content>;
};

export default Jumbo;
