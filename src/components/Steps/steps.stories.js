import React from 'react';
import { storiesOf } from '@storybook/react';
import Steps from './steps';
import Text from '../Typography/text';
import Subheader from '../Typography/subheader';

storiesOf('Steps', module)
  .add('Default', () => (
    <Steps>
      <Steps.Header>
        <Subheader>Header</Subheader>
      </Steps.Header>
      <Steps.Content>
        <Text>Content 1</Text>
      </Steps.Content>
      <Steps.Content>
        <Text>Content 2</Text>
      </Steps.Content>
      <Steps.Content>
        <Text>Content 3</Text>
      </Steps.Content>
      <Steps.Content>
        <Text>Content 4</Text>
      </Steps.Content>
    </Steps>
  ));
