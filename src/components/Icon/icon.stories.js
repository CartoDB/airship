import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { ThemeProvider } from 'styled-components';
import Icon from './icon';
import { theme, ICONS } from '../../constants';

const ICON_LIST = Object.keys(ICONS).map(icon => icon.toLowerCase());

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 48px);
  grid-gap: 1rem;
`;

const CUSTOM_THEME = {
  ...theme,
  brand01: '#F45171',
};

storiesOf('Icon', module)
  .add('Default', () => (
    <Grid>
      {ICON_LIST.map(icon => <div><Icon icon={icon} /></div>)}
    </Grid>
  ))
  .add('Overriding color', () => (
    <Grid>
      {ICON_LIST.map(icon => <div><Icon icon={icon} color="#56C58C" /></div>)}
    </Grid>
  ))
  .add('Overriding size', () => (
    <Grid>
      {ICON_LIST.map(icon => <div><Icon icon={icon} size={32} /></div>)}
    </Grid>
  ))
  .add('With custom path', () => (
    <Grid>
      <Icon path="M8,8 L8,1 L9,1 L9,8 L16,8 L16,9 L9,9 L9,16 L8,16 L8,9 L1,9 L1,8 L8,8 Z" />
    </Grid>
  ))
  .add('With custom theme', () => (
    <ThemeProvider theme={CUSTOM_THEME}>
      <Grid>
        {ICON_LIST.map(icon => <div><Icon icon={icon} /></div>)}
      </Grid>
    </ThemeProvider>
  ));
