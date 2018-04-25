import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'styled-components';
import Button from './button';
import ButtonGroup from './button-group';
import Icon from '../Icon/icon';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  brand01: '#FABADA',
};

storiesOf('Button', module)
  .add('Default', () => (
    <div>
      <h3 className="header">Primary</h3>
      <Button large>Click me</Button>
      <Button>Click me</Button>
      <Button small>Click me</Button>

      <h3 className="header">Scondary</h3>
      <Button large secondary>Click me</Button>
      <Button secondary>Click me</Button>
      <Button small secondary>Click me</Button>

      <h3 className="header">Borderless</h3>
      <Button large borderless>Click me</Button>
      <Button borderless>Click me</Button>
      <Button small borderless>Click me</Button>

      <h3 className="header">With event</h3>
      <Button onClick={action('click')}>Click me</Button>

      <h3 className="header">Grouped</h3>
      <ButtonGroup>
        <Button>
          <Icon icon="plus" />
        </Button>
        <Button>Edit</Button>
        <Button>
          Delete
        </Button>
      </ButtonGroup>

      <h3 className="header">Grouped Secondary</h3>
      <ButtonGroup secondary>
        <Button>
          <Icon icon="plus" />
        </Button>
        <Button>Edit</Button>
        <Button>
          Delete
        </Button>
      </ButtonGroup>
    </div>
  ))
  .add('Disabled', () => (
    <div>
      <h3 className="header">Primary</h3>
      <Button disabled large>Click me</Button>
      <Button disabled>Click me</Button>
      <Button disabled small>Click me</Button>

      <h3 className="header">Scondary</h3>
      <Button disabled large secondary>Click me</Button>
      <Button disabled secondary>Click me</Button>
      <Button disabled small secondary>Click me</Button>

      <h3 className="header">Borderless</h3>
      <Button disabled large borderless>Click me</Button>
      <Button disabled borderless>Click me</Button>
      <Button disabled small borderless>Click me</Button>

      <h3 className="header">With event</h3>
      <Button disabled onClick={action('click')}>Click me</Button>

      <h3 className="header">Grouped</h3>
      <ButtonGroup>
        <Button disabled>
          <Icon icon="plus" />
        </Button>
        <Button disabled>Edit</Button>
        <Button disabled>
          Delete
        </Button>
      </ButtonGroup>

      <h3 className="header">Grouped Secondary</h3>
      <ButtonGroup secondary>
        <Button disabled>
          <Icon icon="plus" />
        </Button>
        <Button disabled>Edit</Button>
        <Button disabled>
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
            <Icon icon="plus" />
          </Button>
          <Button>Edit</Button>
          <Button>
            Delete
          </Button>
        </ButtonGroup>

        <h3 className="header">Grouped Secondary</h3>
        <ButtonGroup secondary>
          <Button>
            <Icon icon="plus" />
          </Button>
          <Button>Edit</Button>
          <Button>
            Delete
          </Button>
        </ButtonGroup>
      </div>
    </ThemeProvider>
  ));
