import React from 'react';
import { storiesOf } from '@storybook/react';
import CategoryWidget from './categoryWidget';
import Widget from '../Widget/widget';
import mockData from './categoryWidget.fixtures';

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
  ));
