import React from 'react';
import { storiesOf } from '@storybook/react';
import DonutChart from './donut';
import Widget from '../Widget/widget';
import mockData from './donut.fixtures';

storiesOf('Donut Chart', module)
  .add('Default', () => (
    <DonutChart data={mockData} />
  ))
  .add('Inside a widget', () => (
    <Widget>
      <Widget.Title>Suffer score</Widget.Title>
      <Widget.Description>Just a widget</Widget.Description>

      <DonutChart data={mockData} />
    </Widget>
  ))
  .add('Without legend', () => (
    <Widget>
      <Widget.Title>Suffer score</Widget.Title>
      <Widget.Description>Just a widget</Widget.Description>

      <DonutChart data={mockData} showLegend={false} />
    </Widget>
  ));
