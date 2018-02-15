import React from 'react';
import styled from 'styled-components';
import Base from './base';

const Basic = styled.p`
  font-family: 'Roboto', 'sans-serif';
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
`;

const Text = (props) => {
  const extended = Object.assign(
    {},
    {
      basic: Basic
    },
    props
  );
  const Content = Base(extended);
  return <Content>{props.children}</Content>;
};

export default Text;
