import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Avatar from './avatar';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  ui02: '#FABADA',
};

storiesOf('Avatar', module)
  .add('Default', () => (
    <Avatar url="https://avatars3.githubusercontent.com/u/1799254" />
  )).add('With custom theme', () => (
    <div>
      <ThemeProvider theme={CUSTOM_THEME}>
        <Avatar url="https://avatars3.githubusercontent.com/u/1799254" />
      </ThemeProvider>
    </div>
  ));
