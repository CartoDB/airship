import React from 'react';
import { css } from 'styled-components';
import { storiesOf } from '@storybook/react';
import Collapsible from '../Collapsible/collapsible';
import Badge from '../Badge/badge';
import Text from '../Typography/text';
import Subheader from '../Typography/subheader';

storiesOf('Collapsible', module)
  .add('Default', () => (
    <div style={{ maxWidth: '200px' }}>
      <Collapsible>
        <Collapsible.Header>
          <Subheader>Global index</Subheader>
        </Collapsible.Header>
        <Collapsible.Content>
          <Badge color="#B4E0FA">Store 1</Badge>
          <Text as="div">Some fanzy text here</Text>
        </Collapsible.Content>
      </Collapsible>
    </div>
  ))
  .add('With overrides', () => {
    const overrides = {
      Collapsible: css`
        background: ${props => props.theme.ui04};
        width: 400px;
      `,
      'Collapsible.Header': css`
        background: ${props => props.theme.brand03};
        padding: 1rem;
      `,
      'Collapsible.Content': css`
        padding: 1rem;
      `,
    };

    return (
      <div style={{ maxWidth: '200px' }}>
        <Collapsible overrides={overrides}>
          <Collapsible.Header>
            <Subheader>Global index</Subheader>
          </Collapsible.Header>
          <Collapsible.Content>
            <Badge color="#B4E0FA">Store 1</Badge>
            <Text as="div">Some fanzy text here</Text>
          </Collapsible.Content>
        </Collapsible>
      </div>
    );
  });
