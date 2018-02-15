import React from 'react';
import styled from 'styled-components';
import Base from './base';

const Basic = styled.h1`
  font-family: 'Roboto', 'sans-serif';
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
`;

const Title = (props) => {
  const extended = Object.assign({}, { basic: Basic }, props);
  const Content = Base(extended);
  return <Content>{props.children}</Content>;
};

export default Title;
