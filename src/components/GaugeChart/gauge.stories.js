import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import GaugeChart from './gauge';
import Widget from '../Widget/widget';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  type01: '#7E78E2',
};

class GaugeChartUpdated extends React.Component {
  state = {
    value: 60,
  }

  changeState = () => {
    this.setState({ value: parseInt(Math.random(100) * 100, 10) });
  }

  render() {
    return (
      <div>
        <GaugeChart value={this.state.value} />
        <button onClick={this.changeState}>Click me</button>
      </div>
    );
  }
}

storiesOf('GaugeChart', module)
  .add('Default', () => (
    <GaugeChart value={60} label="Test" />
  ))
  .add('Inside a widget', () => (
    <Widget>
      <Widget.Title>Title</Widget.Title>
      <Widget.Description>Description</Widget.Description>
      <GaugeChart value={60} />
    </Widget>
  ))
  .add('Updating data', () => (
    <Widget>
      <Widget.Title>Suffer score</Widget.Title>
      <Widget.Description>Just a widget</Widget.Description>

      <GaugeChartUpdated />
    </Widget>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <Widget>
        <Widget.Title>Suffer score</Widget.Title>
        <Widget.Description>Just a widget</Widget.Description>

        <GaugeChart value={12} label="parsecs" color="#7E78E2" />
      </Widget>
    </ThemeProvider>
  ));
