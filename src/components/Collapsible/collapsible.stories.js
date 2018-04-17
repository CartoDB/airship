import React from 'react';
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
  ));
