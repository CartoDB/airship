import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import DonutChart from './donut';
import Widget from '../Widget/widget';
import mockData from './donut.fixtures';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  ui01: '#333',
  type01: 'white',
};

class DonutUpdated extends React.Component {
  state = {
    data: mockData,
  }

  changeState = () => {
    this.setState(prevState => ({
      data: prevState.data.length !== 2 ? mockData.slice(0, 2) : mockData,
    }));
  }

  render() {
    return (
      <div>
        <DonutChart data={this.state.data} />
        <button onClick={this.changeState}>Click me</button>
      </div>
    );
  }
}

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
  ))
  .add('Updating data', () => (
    <Widget>
      <Widget.Title>Suffer score</Widget.Title>
      <Widget.Description>Just a widget</Widget.Description>

      <DonutUpdated />
    </Widget>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <Widget>
        <Widget.Title>Suffer score</Widget.Title>
        <Widget.Description>Just a widget</Widget.Description>

        <DonutUpdated />
      </Widget>
    </ThemeProvider>
  ));
