import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { action } from '@storybook/addon-actions';
import Toggle from './toggle';
import Text from '../Typography/text';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  brand01: '#000',
  brand03: '#777',
  ui04: '#555',
  ui01: '#FABADA',
};

storiesOf('Toggle', module)
  .add('Default', () => (
    <div>
      <h3 className="header">Default</h3>
      <Toggle htmlFor="default">
        <Text>Hello there</Text>
      </Toggle>

      <h3 className="header">With label</h3>
      <Toggle htmlFor="with-label">
        <Text>General Kenobi</Text>
      </Toggle>

      <h3 className="header">Checked</h3>
      <Toggle htmlFor="checked" checked />

      <h3 className="header">Disabled</h3>
      <Toggle htmlFor="disabled" disabled />

      <h3 className="header">With event</h3>
      <Toggle htmlFor="with-event" onChange={action('onChange')}>
        <Text>Watto</Text>
      </Toggle>
    </div>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <div>
        <h3 className="header">Default</h3>
        <Toggle htmlFor="default">
          <Text>Hello there</Text>
        </Toggle>

        <h3 className="header">With label</h3>
        <Toggle htmlFor="with-label">
          <Text>General Kenobi</Text>
        </Toggle>

        <h3 className="header">Checked</h3>
        <Toggle htmlFor="checked" checked />

        <h3 className="header">Disabled</h3>
        <Toggle htmlFor="disabled" disabled />
      </div>
    </ThemeProvider>
  ));
