import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DonutChart from './donut';
import Widget from '../Widget/widget';
import mockData from './donut.fixtures';

storiesOf('Donut Chart', module)
  .add('Default', () => (
    <DonutChart data={mockData.categories} />
  ))
  .add('Inside a widget', () => (
    <Widget>
      <Widget.Title>Suffer score</Widget.Title>
      <Widget.Description>Just a widget</Widget.Description>

      <DonutChart data={mockData.categories} />
    </Widget>
  ));
