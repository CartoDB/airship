import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Icon, { ICON_LIST } from './icon';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  brand01: '#56C58C',
};

storiesOf('Icon', module)
  .add('Default', () => (
    <div>
      {ICON_LIST.map(icon => <Icon icon={icon} size={32} />)}
    </div>
  ))
  .add('Overriding color', () => (
    <div>
      <Icon icon="info" color="#56C58C" />
    </div>
  ))
  .add('Overriding size', () => (
    <div>
      <Icon icon="info" size={512} />
    </div>
  ))
  .add('With custom path', () => (
    <div>
      <Icon path="M8,8 L8,1 L9,1 L9,8 L16,8 L16,9 L9,9 L9,16 L8,16 L8,9 L1,9 L1,8 L8,8 Z" />
    </div>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <div>
        {ICON_LIST.map(icon => <Icon icon={icon} size={32} />)}
      </div>
    </ThemeProvider>
  ));
