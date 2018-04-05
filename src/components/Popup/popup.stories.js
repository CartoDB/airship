import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Popup from './popup';

const IMAGE = 'https://images.unsplash.com/photo-1520507283041-1f2c1d54a781?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4ba2a3cd698943822fe960b6f4bff7f1&auto=format&fit=crop&w=633&q=80';

storiesOf('Popup', module)
  .add('Default', () => (
    <Popup>
      <p>This is some content</p>
      <p>This is some content</p>
      <p>This is some content</p>
      <p>This is some content</p>
    </Popup>
  ))
  .add('With image and text', () => (
    <Popup image={IMAGE}>
      This is some content
    </Popup>
  ))
  .add('With only image', () => (
    <Popup image={IMAGE} />
  ));
