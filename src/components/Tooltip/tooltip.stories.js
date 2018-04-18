import React from 'react';
import { storiesOf } from '@storybook/react';
import { ThemeProvider } from 'styled-components';
import Tooltip from './tooltip';
import { theme } from '../../constants';

const CUSTOM_THEME = {
  ...theme,
  black: '#FABADA',
  white: '#333',
};

storiesOf('Tooltip', module)
  .add('Default', () => (
    <div>
      <h3 className="header">Default</h3>
      <Tooltip>
        <Tooltip.Content>Hello world</Tooltip.Content>
        <Tooltip.Trigger>Hover me</Tooltip.Trigger>
      </Tooltip>

      <h3 className="header">Using other wrapper</h3>
      <Tooltip as="strong">
        <Tooltip.Content>Hello world</Tooltip.Content>
        <Tooltip.Trigger>Hover me</Tooltip.Trigger>
      </Tooltip>

      <h3 className="header">Different sides</h3>
      <Tooltip to="bottom">
        <Tooltip.Content>Never tell me the odds!</Tooltip.Content>
        <Tooltip.Trigger>Bottom</Tooltip.Trigger>
      </Tooltip>

      <Tooltip to="right">
        <Tooltip.Content>Never tell me the odds!</Tooltip.Content>
        <Tooltip.Trigger>Right</Tooltip.Trigger>
      </Tooltip>

      <Tooltip to="left">
        <Tooltip.Content>Never tell me the odds!</Tooltip.Content>
        <Tooltip.Trigger>Left</Tooltip.Trigger>
      </Tooltip>
    </div>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <div>
        <h3 className="header">Default</h3>
        <Tooltip>
          <Tooltip.Content>Hello world</Tooltip.Content>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
        </Tooltip>

        <h3 className="header">Using other wrapper</h3>
        <Tooltip as="strong">
          <Tooltip.Content>Hello world</Tooltip.Content>
          <Tooltip.Trigger>Hover me</Tooltip.Trigger>
        </Tooltip>

        <h3 className="header">Different sides</h3>
        <Tooltip to="bottom">
          <Tooltip.Content>Never tell me the odds!</Tooltip.Content>
          <Tooltip.Trigger>Bottom</Tooltip.Trigger>
        </Tooltip>

        <Tooltip to="right">
          <Tooltip.Content>Never tell me the odds!</Tooltip.Content>
          <Tooltip.Trigger>Right</Tooltip.Trigger>
        </Tooltip>

        <Tooltip to="left">
          <Tooltip.Content>Never tell me the odds!</Tooltip.Content>
          <Tooltip.Trigger>Left</Tooltip.Trigger>
        </Tooltip>
      </div>
    </ThemeProvider>
  ));
