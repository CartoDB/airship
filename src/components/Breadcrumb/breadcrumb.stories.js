import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Breadcrumb from './breadcrumb';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  brand01: '#FABADA',
};

storiesOf('Breadcrumb', module)
  .add('Default', () => (
    <Breadcrumb>
      <Breadcrumb.Item>
        <a href="/">Home</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="/foo">Home</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>Wadus</Breadcrumb.Item>
    </Breadcrumb>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/">Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <a href="/foo">Home</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Wadus</Breadcrumb.Item>
      </Breadcrumb>
    </ThemeProvider>
  ));
