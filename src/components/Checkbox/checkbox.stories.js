import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import { action } from '@storybook/addon-actions';
import Checkbox from './checkbox';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  brand01: '#FABADA',
};

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

      <h3 className="header">With error</h3>
      <Checkbox htmlFor="error" error>
        Hello there
      </Checkbox>

      <h3 className="header">Checked with error</h3>
      <Checkbox htmlFor="checked-error" checked error>
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

      <h3 className="header">With error</h3>
      <Checkbox htmlFor="checked" disabled error>
        Hello there
      </Checkbox>

      <h3 className="header">With error checked</h3>
      <Checkbox htmlFor="checked" disabled error checked>
        Hello there
      </Checkbox>
    </div>
  ))
  .add('With event', () => (
    <div>
      <h3 className="header">Default</h3>
      <Checkbox htmlFor="default" onChange={action('onChange')}>
        Click me!
      </Checkbox>

      <h3 className="header">Checked</h3>
      <Checkbox htmlFor="checked" onChange={action('onChange')} checked>
        Click me!
      </Checkbox>

      <h3 className="header">Disabled</h3>
      <Checkbox htmlFor="disabled" onChange={action('onChange')} disabled>
        Click me!
      </Checkbox>
    </div>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <div>
        <h3 className="header">Default</h3>
        <Checkbox htmlFor="default">
          Click me!
        </Checkbox>

        <h3 className="header">Checked</h3>
        <Checkbox htmlFor="checked" checked>
          Click me!
        </Checkbox>

        <h3 className="header">Disabled</h3>
        <Checkbox htmlFor="disabled" disabled>
          Click me!
        </Checkbox>
      </div>
    </ThemeProvider>
  ));
