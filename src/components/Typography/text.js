import React from 'react';
import styled from 'styled-components';
import Base from './base';

let Basic = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
`;

const Text = (props) => {
  if (props.font === 'mono') {
    Basic = Basic.extend`
      line-height: 16px;
    `;
  }

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
