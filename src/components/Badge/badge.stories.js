import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'styled-components';
import Badge from './badge';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  ui03: '#333',
  type01: 'white',
};

storiesOf('Badge', module)
  .add('Default', () => (
    <Badge>Store</Badge>
  ))
  .add('With custom element', () => (
    <Badge as="span">I am a span</Badge>
  ))
  .add('With custom color', () => (
    <Badge color="#FABADA">Different color</Badge>
  ))
  .add('With action', () => (
    <Badge onClose={action('closing')}>Store</Badge>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <Badge>Store</Badge>
    </ThemeProvider>
  ));
