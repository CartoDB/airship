import React from 'react';
import { storiesOf } from '@storybook/react';
import Dropdown from './dropdown';

storiesOf('Dropdown', module)
  .add('Default', () => (
    <div style={{ maxWidth: '200px' }}>
      <Dropdown>
        <Dropdown.Trigger>Click me</Dropdown.Trigger>
        <Dropdown.Content>
          <Dropdown.Menu>
            <Dropdown.Item>All</Dropdown.Item>
            <Dropdown.Item>Open</Dropdown.Item>
            <Dropdown.Item>Fullfilled</Dropdown.Item>
            <Dropdown.Item>Close</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown.Content>
      </Dropdown>
    </div>
  ));
