import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Tabs from './tabs';
import Text from '../Typography/text';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  brand01: '#FABADA',
  brand03: '#FABADA',
};

storiesOf('Tabs', module)
  .add('Default', () => (
    <Tabs>
      <Tabs.Panel label="First tab">
        <Text>Hello there</Text>
      </Tabs.Panel>
      <Tabs.Panel label="Second tab">
        <Text>General Kenobi</Text>
      </Tabs.Panel>
    </Tabs>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <Tabs>
        <Tabs.Panel label="First tab">
          <Text>Hello there</Text>
        </Tabs.Panel>
        <Tabs.Panel label="Second tab">
          <Text>General Kenobi</Text>
        </Tabs.Panel>
      </Tabs>
    </ThemeProvider>
  ));
