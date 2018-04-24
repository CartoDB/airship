import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Banner from './banner';
import Icon from '../Icon/icon';
import Text from '../Typography/text';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  ui04: '#333',
  type01: 'white',
};

storiesOf('Banner', module)
  .add('Default', () => (
    <Banner>
      <Banner.Icon>
        <Icon icon="alert_fill" size={12} />
      </Banner.Icon>
      <Banner.Content>
        <Text>
          An error has ocurred. Could not retreive customer information
        </Text>
      </Banner.Content>
    </Banner>
  ))
  .add('With custom color', () => (
    <Banner color="#4f1091">
      <Banner.Icon>
        <Icon icon="alert_fill" color="#fff" size={12} />
      </Banner.Icon>
      <Banner.Content>
        <Text color="#fff">
          An error has ocurred. Could not retreive customer information
        </Text>
      </Banner.Content>
    </Banner>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <Banner color="#333">
        <Banner.Icon>
          <Icon icon="alert_fill" color="#fff" size={12} />
        </Banner.Icon>
        <Banner.Content>
          <Text>
            An error has ocurred. Could not retreive customer information
          </Text>
        </Banner.Content>
      </Banner>
    </ThemeProvider>
  ));
