import React from 'react';
import styled from 'styled-components';
import Base from './base';

const Basic = styled.p`
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
`;

const Caption = (props) => {
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

export default Caption;
