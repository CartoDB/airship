import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { action } from '@storybook/addon-actions';
import Range from './range';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  brand01: '#FABADA',
};

storiesOf('Range', module)
  .add('Default', () => (
    <div style={{ padding: '1rem' }}>
      <h3 className="header">Default</h3>
      <Range />

      <h3 className="header">Default disabled</h3>
      <Range disabled />

      <h3 className="header">With an event</h3>
      <Range onChange={action('changed')} />

      <h3 className="header">With multivalue</h3>
      <Range
        draggable
        value={{ min: 5, max: 15 }}
        minValue={0}
        maxValue={30}
      />
      <h3 className="header">With multivalue disabled</h3>
      <Range
        disabled
        draggable
        value={{ min: 5, max: 15 }}
        minValue={0}
        maxValue={30}
      />
    </div>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <Range />
    </ThemeProvider>
  ));
