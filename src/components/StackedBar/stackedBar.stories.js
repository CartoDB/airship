import React from 'react';
import { storiesOf } from '@storybook/react';
import StackedBar from './stackedBar';
import Widget from '../Widget/widget';
import mockData from './stackedBar.fixtures';

class StackedBarUpdated extends React.Component {
  state = {
    data: mockData,
  }

  changeState = () => {
    this.setState(prevState => ({
      data: prevState.data.length !== 2 ? mockData.slice(1, 3) : mockData,
    }));
  }

  render() {
    return (
      <div>
        <StackedBar data={this.state.data} keys={['private_rooms', 'shared_rooms', 'entire_homes']} />
        <button onClick={this.changeState}>Click me</button>
      </div>
    );
  }
}

storiesOf('StackedBar', module)
  .add('Default', () => (
    <StackedBar data={mockData} keys={['private_rooms', 'shared_rooms', 'entire_homes']} />
  ))
  .add('Inside a widget', () => (
    <Widget>
      <Widget.Title>Suffer score</Widget.Title>
      <Widget.Description>Just a widget</Widget.Description>

      <StackedBar data={mockData} keys={['private_rooms', 'shared_rooms', 'entire_homes']} />
    </Widget>
  ))
  .add('Updating data', () => (
    <Widget>
      <Widget.Title>Suffer score</Widget.Title>
      <Widget.Description>Just a widget</Widget.Description>

      <StackedBarUpdated />
    </Widget>
  ));
