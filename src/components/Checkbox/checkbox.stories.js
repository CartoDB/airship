import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkbox from './checkbox';

storiesOf('Checkbox', module)
  .add('Default', () => (
    <div>
      <h3 className="header">Default</h3>
      <Checkbox />

      <h3 className="header">Checked</h3>
      <Checkbox name="three" checked>Hola</Checkbox>

      <h3 className="header">Disabled</h3>
      <Checkbox disabled>Disabled</Checkbox>
    </div>
  ))
  .add('Disabled', () => (
    <div>
      <h3 className="header">Disabled</h3>
      <Checkbox />

      <h3 className="header">Checked</h3>
      <Checkbox name="three" disabled checked>Hola</Checkbox>
    </div>
  ))
  .add('With event', () => (
    <div>
      <h3 className="header">Default</h3>
      <Checkbox checked onChange={state => console.log(state)}>Option</Checkbox>
    </div>
  ))
