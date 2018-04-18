import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Widget from './widget';
import Text from '../Typography/text';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  type01: '#FFF',
  type02: '#EEE',
  ui01: '#333',
};

storiesOf('Widget', module)
  .add('Default', () => (
    <div>
      <Widget>
        <Widget.Title>Populated Places</Widget.Title>
        <Widget.Description>All selected</Widget.Description>
        <Text>I am the senate!</Text>
      </Widget>
    </div>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <Widget>
        <Widget.Title>Populated Places</Widget.Title>
        <Widget.Description>All selected</Widget.Description>
        <Text>I am the senate!</Text>
      </Widget>
    </ThemeProvider>
  ));
