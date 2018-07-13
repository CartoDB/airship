import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import SelectableHistogram from './selectableHistogram';
import { action } from '@storybook/addon-actions';
import Widget from '../Widget/widget';
import mockData from './selectableHistogram.fixtures';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  ui01: '#333',
  type01: 'white',
  type02: '#F5F5F5',
};
class HistogramUpdated extends React.Component {
  state = {
    data: mockData,
  }

  changeState = () => {
    this.setState(prevState => ({
      data: prevState.data.length !== 3 ? mockData.slice(2, 5) : mockData,
    }));
  }

  render() {
    return (
      <div>
        <SelectableHistogram data={this.state.data} />
        <button onClick={this.changeState}>Click me</button>
      </div>
    );
  }
}

storiesOf('SelectableHistogram', module)
  .add('selectable', () => (
    <SelectableHistogram data={mockData} selected={{min:8, max:88}} onSelectedData={action('selected')} />
  ))
  .add('Updating data', () => (
    <Widget>
      <Widget.Title>Suffer score</Widget.Title>
      <Widget.Description>Just a widget</Widget.Description>

      <HistogramUpdated />
    </Widget>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <Widget>
        <Widget.Title>Suffer score</Widget.Title>
        <Widget.Description>Just a widget</Widget.Description>

        <SelectableHistogram data={mockData} />
      </Widget>
    </ThemeProvider>
  ));
