import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'styled-components';
import Flag from './flag';
import AlertFillIcon from '../Icons/alert-fill';
import Text from '../Typography/text';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  ui01: '#333',
  type01: 'white',
};

storiesOf('Flag', module)
  .add('Default', () => (
    <Flag onClick={action('Closed!')}>
      <Flag.Icon>
        <AlertFillIcon color="#80B622" width={12} height={12} />
      </Flag.Icon>
      <Flag.Content>
        <Text weight="medium">
          You are now conected
        </Text>
        <Text>
          You have been added to the group “New Store on this region”
        </Text>
      </Flag.Content>
    </Flag>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <Flag onClick={action('Closed!')}>
        <Flag.Icon>
          <AlertFillIcon color="#80B622" width={12} height={12} />
        </Flag.Icon>
        <Flag.Content>
          <Text weight="medium">
            You are now conected
          </Text>
          <Text>
            You have been added to the group “New Store on this region”
          </Text>
        </Flag.Content>
      </Flag>
    </ThemeProvider>
  ));
