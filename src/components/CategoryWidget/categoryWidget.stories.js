import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'styled-components';
import CategoryWidget from './categoryWidget';
import Widget from '../Widget/widget';
import mockData from './categoryWidget.fixtures';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  ui01: '#333',
  type01: 'white',
  type02: 'white',
  brand03: '#FF5500',
};

storiesOf('Category Widget', module)
  .add('Default', () => (
    <CategoryWidget
      categories={mockData.categories}
      max={mockData.max}
    />
  ))
  .add('Inside a widget', () => (
    <Widget>
      <Widget.Title>Widget</Widget.Title>
      <Widget.Description>Just a widget</Widget.Description>

      <CategoryWidget
        categories={mockData.categories}
        max={mockData.max}
      />
    </Widget>
  ))
  .add('Custom color', () => (
    <Widget>
      <Widget.Title>Widget</Widget.Title>
      <Widget.Description>Just a widget</Widget.Description>

      <CategoryWidget
        categories={mockData.categories}
        max={mockData.max}
        color="#FABADA"
      />
    </Widget>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <Widget>
        <Widget.Title>Widget</Widget.Title>
        <Widget.Description>Just a widget</Widget.Description>

        <CategoryWidget
          categories={mockData.categories}
          max={mockData.max}
          onCategoryClick={action('category clicked')}
        />
      </Widget>
    </ThemeProvider>
  ));
