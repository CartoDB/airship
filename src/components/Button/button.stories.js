import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'styled-components';
import Button from './button';
import ButtonGroup from './button-group';
import PlusIcon from '../Icons/plus';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  brand01: '#FABADA',
};

storiesOf('Button', module)
  .add('Default', () => (
    <div>
      <h3 className="header">Primary</h3>
      <Button>Click me</Button>

      <h3 className="header">Scondary</h3>
      <Button secondary>Click me</Button>

      <h3 className="header">Borderless</h3>
      <Button borderless>Click me</Button>

      <h3 className="header">With event</h3>
      <Button onClick={action('click')}>Click me</Button>

      <h3 className="header">Grouped</h3>
      <ButtonGroup>
        <Button>
          <PlusIcon />
        </Button>
        <Button>Edit</Button>
        <Button>
          Delete
        </Button>
      </ButtonGroup>

      <h3 className="header">Grouped Secondary</h3>
      <ButtonGroup secondary>
        <Button>
          <PlusIcon />
        </Button>
        <Button>Edit</Button>
        <Button>
          Delete
        </Button>
      </ButtonGroup>
    </div>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <div>
        <h3 className="header">Primary</h3>
        <Button>Click me</Button>

        <h3 className="header">Scondary</h3>
        <Button secondary>Click me</Button>

        <h3 className="header">Borderless</h3>
        <Button borderless>Click me</Button>

        <h3 className="header">With event</h3>
        <Button onClick={action('click')}>Click me</Button>

        <h3 className="header">Grouped</h3>
        <ButtonGroup>
          <Button>
            <PlusIcon />
          </Button>
          <Button>Edit</Button>
          <Button>
            Delete
          </Button>
        </ButtonGroup>

        <h3 className="header">Grouped Secondary</h3>
        <ButtonGroup secondary>
          <Button>
            <PlusIcon />
          </Button>
          <Button>Edit</Button>
          <Button>
            Delete
          </Button>
        </ButtonGroup>
      </div>
    </ThemeProvider>
  ));
