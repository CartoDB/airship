import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'styled-components';
import Input from './input';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  brand01: '#40e0d0',
  brand03: '#33b3a6',
  ui02: '#d8f8f5',
  ui04: '#b2f2ec',
  support01: '#f2b2b9',
};

storiesOf('Input', module)
  .add('Default', () => (
    <div>
      <h3 className="header">Default</h3>
      <Input htmlFor="default" />

      <h3 className="header">With placeholder</h3>
      <Input
        htmlFor="default-placeholder"
        placeholder="This is a test"
      />

      <h3 className="header">With label</h3>
      <Input
        htmlFor="default-label"
        placeholder="This is a test"
        label="First Name"
      />

      <h3 className="header">With value</h3>
      <Input
        htmlFor="default-value"
        placeholder="This is a test"
        label="First Name"
        defaultValue="A value"
      />

      <h3 className="header">Multiline</h3>
      <Input
        htmlFor="default-multiline"
        placeholder="This is a test"
        label="First Name"
        defaultValue="I'm thinking two circus clowns dancing. You? Pretend. You pretend the feelings are there, for the world, for the people around you. Who knows? Maybe one day they will be. I'm really more an apartment person."
        multiline
        rows={3}
      />
    </div>
  ))
  .add('Disabled', () => (
    <div>
      <h3 className="header">Default</h3>
      <Input
        disabled
        htmlFor="disabled"
      />

      <h3 className="header">With placeholder</h3>
      <Input
        disabled
        htmlFor="disabled-placeholder"
        placeholder="This is a test"
      />

      <h3 className="header">With label</h3>
      <Input
        disabled
        htmlFor="disabled-label"
        placeholder="This is a test"
        label="First Name"
      />

      <h3 className="header">With value</h3>
      <Input
        disabled
        htmlFor="disabled-value"
        placeholder="This is a test"
        label="First Name"
        defaultValue="A value"
      />

      <h3 className="header">Multiline</h3>
      <Input
        disabled
        htmlFor="disabled-multiline"
        placeholder="This is a test"
        label="First Name"
        defaultValue="I'm thinking two circus clowns dancing. You? Pretend. You pretend the feelings are there, for the world, for the people around you. Who knows? Maybe one day they will be. I'm really more an apartment person."
        multiline
        rows={3}
      />
    </div>
  ))
  .add('Read only', () => (
    <div>
      <h3 className="header">Default</h3>
      <Input
        readOnly
        htmlFor="readonly"
      />

      <h3 className="header">With placeholder</h3>
      <Input
        readOnly
        htmlFor="readonly-placeholder"
        placeholder="This is a test"
      />

      <h3 className="header">With label</h3>
      <Input
        readOnly
        htmlFor="readonly-label"
        placeholder="This is a test"
        label="First Name"
      />

      <h3 className="header">With value</h3>
      <Input
        readOnly
        htmlFor="readonly-value"
        placeholder="This is a test"
        label="First Name"
        defaultValue="A value"
      />

      <h3 className="header">Multiline</h3>
      <Input
        readOnly
        htmlFor="readonly-multiline"
        placeholder="This is a test"
        label="First Name"
        defaultValue="I'm thinking two circus clowns dancing. You? Pretend. You pretend the feelings are there, for the world, for the people around you. Who knows? Maybe one day they will be. I'm really more an apartment person."
        multiline
        rows={3}
      />
    </div>
  ))
  .add('With error', () => (
    <div>
      <h3 className="header">Default</h3>
      <Input
        error="This field is required"
        htmlFor="error"
      />

      <h3 className="header">With placeholder</h3>
      <Input
        error="This field is required"
        htmlFor="error-placeholder"
        placeholder="This is a test"
      />

      <h3 className="header">With label</h3>
      <Input
        error="This field is required"
        htmlFor="error-label"
        placeholder="This is a test"
        label="First Name"
      />

      <h3 className="header">With value</h3>
      <Input
        error="This field is required"
        htmlFor="error-value"
        placeholder="This is a test"
        label="First Name"
        defaultValue="A value"
      />

      <h3 className="header">Multiline</h3>
      <Input
        error="This field is required"
        htmlFor="error-multiline"
        placeholder="This is a test"
        label="First Name"
        defaultValue="I'm thinking two circus clowns dancing. You? Pretend. You pretend the feelings are there, for the world, for the people around you. Who knows? Maybe one day they will be. I'm really more an apartment person."
        multiline
        rows={3}
      />
    </div>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <div>
        <h3 className="header">Default</h3>
        <Input
          htmlFor="default-value"
          placeholder="This is a test"
          label="First Name"
          defaultValue="A value"
        />

        <h3 className="header">Disabled</h3>
        <Input
          disabled
          htmlFor="disabled-value"
          placeholder="This is a test"
          label="First Name"
          defaultValue="A value"
        />

        <h3 className="header">Read only</h3>
        <Input
          readOnly
          htmlFor="readonly-value"
          placeholder="This is a test"
          label="First Name"
          defaultValue="A value"
        />

        <h3 className="header">Error</h3>
        <Input
          error="This field is required"
          htmlFor="error-value"
          placeholder="This is a test"
          label="First Name"
          defaultValue="A value"
        />
      </div>
    </ThemeProvider>
  ))
  .add('Different types', () => (
    <div>
      <h3 className="header">Text</h3>
      <Input
        htmlFor="type-text"
        defaultValue="Wadus"
      />

      <h3 className="header">Email</h3>
      <Input
        htmlFor="type-email"
        type="email"
        defaultValue="wadus@carto.com"
      />

      <h3 className="header">Number</h3>
      <Input
        htmlFor="type-number"
        type="number"
        defaultValue="5"
      />

      <h3 className="header">Date</h3>
      <Input
        htmlFor="type-date"
        type="date"
        defaultValue="1991-02-05"
      />

      <h3 className="header">Color</h3>
      <Input
        htmlFor="type-color"
        type="color"
        defaultValue="#FABADA"
      />

      <h3 className="header">Password</h3>
      <Input
        htmlFor="type-password"
        type="password"
        defaultValue="its a secret"
      />

      <h3 className="header">Time</h3>
      <Input
        htmlFor="type-time"
        type="time"
        defaultValue="15:30"
      />

      <h3 className="header">File</h3>
      <Input
        htmlFor="type-file"
        type="file"
      />
    </div>
  ))
  .add('With event', () => (
    <div>
      <h3 className="header">onChange event</h3>
      <Input
        htmlFor="with-event"
        placeholder="Type here to see the event"
        onChange={action('Input changed')}
      />
    </div>
  ));
