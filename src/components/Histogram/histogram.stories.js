import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Histogram from './histogram';
import Widget from '../Widget/widget';
import mockData from './histogram.fixtures';

class HistogramUpdated extends React.Component {
  state = {
    data: mockData
  }

  changeState = () => {
    this.setState(prevState => ({
      data: prevState.data.length !== 4 ? mockData.slice(0, 4) : mockData
    }))
  }

  render() {
    return (
      <div>
        <Histogram data={this.state.data} />
        <button onClick={this.changeState}>Click me</button>
      </div>
    )
  }
}

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
  ))
  .add('Updating data', () => (
    <Widget>
      <Widget.Title>Suffer score</Widget.Title>
      <Widget.Description>Just a widget</Widget.Description>

      <HistogramUpdated />
    </Widget>
  ));
