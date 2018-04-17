import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { action } from '@storybook/addon-actions';
import RadioButton from './radiobutton';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  brand01: '#FABADA',
};

storiesOf('RadioButton', module)
  .add('Default', () => (
    <div>
      <h3 className="header">Default</h3>
      <RadioButton htmlFor="default" />

      <h3 className="header">With label</h3>
      <RadioButton htmlFor="with-label">
        Hello there
      </RadioButton>

      <h3 className="header">Checked</h3>
      <RadioButton htmlFor="checked" checked>
        Hello there
      </RadioButton>

      <h3 className="header">Checked</h3>
      <RadioButton.Group name="radios">
        <RadioButton value="0">One</RadioButton>
        <RadioButton value="1">two</RadioButton>
      </RadioButton.Group>
    </div>
  ))
  .add('Disabled', () => (
    <div>
      <h3 className="header">Default</h3>
      <RadioButton htmlFor="disabled" disabled />

      <h3 className="header">With label</h3>
      <RadioButton htmlFor="with-label" disabled>
        Hello there
      </RadioButton>

      <h3 className="header">Checked</h3>
      <RadioButton htmlFor="checked" disabled checked>
        Hello there
      </RadioButton>
    </div>
  ))
  .add('With event', () => (
    <div>
      <h3 className="header">Default</h3>
      <RadioButton htmlFor="default" onChange={action('onChange')}>
        Click me!
      </RadioButton>

      <h3 className="header">Checked</h3>
      <RadioButton htmlFor="checked" onChange={action('onChange')} checked>
        Click me!
      </RadioButton>

      <h3 className="header">Disabled</h3>
      <RadioButton htmlFor="disabled" onChange={action('onChange')} disabled>
        Click me!
      </RadioButton>
    </div>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <div>
        <h3 className="header">Default</h3>
        <RadioButton htmlFor="default">
          Click me!
        </RadioButton>

        <h3 className="header">Checked</h3>
        <RadioButton htmlFor="checked" checked>
          Click me!
        </RadioButton>

        <h3 className="header">Disabled</h3>
        <RadioButton htmlFor="disabled" disabled>
          Click me!
        </RadioButton>
      </div>
    </ThemeProvider>
  ));
