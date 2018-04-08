import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './button';
import ButtonGroup from './button-group';
import PlusIcon from '../Icons/plus';

storiesOf('Button', module)
  .add('Default', () => (
    <div>
      <h3 className="header">Primary</h3>
      <Button>Cubmit</Button>

      <h3 className="header">Scondary</h3>
      <Button secondary>Cubmit</Button>

      <h3 className="header">Borderless</h3>
      <Button borderless>Cubmit</Button>

      <h3 className="header">With event</h3>
      <Button onClick={action('click')}>Cubmit</Button>

      <h3 className="header">Grouped</h3>
      <ButtonGroup>
        <Button>
          <PlusIcon />
        </Button>
        <Button>Hello</Button>
        <Button>
          World
        </Button>
      </ButtonGroup>
    </div>
  ));
