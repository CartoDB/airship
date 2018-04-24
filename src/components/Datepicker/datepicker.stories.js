import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Datepicker from './datepicker';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  ui01: '#333',
  ui02: '#555',
  type01: 'white',
  type02: 'white',
  type03: 'white',
  brand01: '#FF5500',
};
storiesOf('DatePicker', module)
  .add('Default', () => (
    <Datepicker
      fromMonth={new Date(2018, 8)}
      toMonth={new Date(2020, 11)}
    />
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <Datepicker
        fromMonth={new Date(2018, 8)}
        toMonth={new Date(2020, 11)}
      />
    </ThemeProvider>
  ));
