import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Histogram from './histogram';
import Widget from '../Widget/widget';
import mockData from './histogram.fixtures';

const DATA = mockData.bins.map(({ min, max, freq }) => ({ min, max, freq }))

storiesOf('Histogram', module)
  .add('Default', () => (
    <Histogram data={mockData} />
  ))
  .add('Inside a widget', () => (
    <Widget>
      <Widget.Title>Suffer score</Widget.Title>
      <Widget.Description>Just a widget</Widget.Description>

      <Histogram data={mockData} />
    </Widget>
  ));
