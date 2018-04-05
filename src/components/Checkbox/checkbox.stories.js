import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Checkbox from './checkbox';

storiesOf('Checkbox', module)
  .add('Default', () => (
    <div>
      <h3 className="header">Default</h3>
      <Checkbox htmlFor="default" />

      <h3 className="header">With label</h3>
      <Checkbox htmlFor="with-label">
        Hello there
      </Checkbox>

      <h3 className="header">Checked</h3>
      <Checkbox htmlFor="checked" checked>
        Hello there
      </Checkbox>
    </div>
  ))
  .add('Disabled', () => (
    <div>
      <h3 className="header">Default</h3>
      <Checkbox htmlFor="disabled" disabled />

      <h3 className="header">With label</h3>
      <Checkbox htmlFor="with-label" disabled>
        Hello there
      </Checkbox>

      <h3 className="header">Checked</h3>
      <Checkbox htmlFor="checked" disabled checked>
        Hello there
      </Checkbox>
    </div>
  ))
  .add('With event', () => (
    <div>
      <h3 className="header">Default</h3>
      <Checkbox htmlFor="event" onChange={action('onChange')}>
        Click me!
      </Checkbox>

      <h3 className="header">Checked</h3>
      <Checkbox htmlFor="event" onChange={action('onChange')} checked>
        Click me!
      </Checkbox>

      <h3 className="header">Disabled</h3>
      <Checkbox htmlFor="event" onChange={action('onChange')} disabled>
        Click me!
      </Checkbox>
    </div>
  ))
