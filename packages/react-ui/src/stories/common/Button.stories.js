import React from 'react';
import { Button, IconButton, Grid, SvgIcon } from '@material-ui/core';

export default {
  title: '2 Common/01-Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['text', 'contained', 'outlined']
      }
    },
    color: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary']
      }
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large']
      }
    },
    disabled: {
      control: {
        type: 'boolean'
      }
    }
  }
};

const Icon = (props) => <SvgIcon {...props}><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></SvgIcon>;
const PlaygroundTemplate = ({ label, icon, ...rest}) => (
  <Grid container spacing={2}>
    <Grid item xs={3}><Button {...rest}>{label}</Button></Grid>
    <Grid item xs={3}><Button {...rest} startIcon={<Icon/>}>{label}</Button></Grid>
    <Grid item xs={3}><Button {...rest} endIcon={<Icon/>}>{label}</Button></Grid>
    <Grid item xs={3}><IconButton {...rest} aria-label={label}><Icon/></IconButton></Grid>
  </Grid>
);
const ButtonTemplate = ({ label, icon, ...rest }) => (
  <Grid container spacing={2}>
    <Grid item container spacing={2}>
      <Grid item xs={3}><Button {...rest} size="small">{label}</Button></Grid>
      <Grid item xs={3}><Button {...rest} startIcon={<Icon/>} size="small">{label}</Button></Grid>
      <Grid item xs={3}><Button {...rest} endIcon={<Icon/>} size="small">{label}</Button></Grid>
      <Grid item xs={3}><IconButton {...rest} aria-label={label} size="small"><Icon/></IconButton></Grid>
    </Grid>
    <Grid item container spacing={2}>
      <Grid item xs={3}><Button {...rest} size="medium">{label}</Button></Grid>
      <Grid item xs={3}><Button {...rest} startIcon={<Icon/>} size="medium">{label}</Button></Grid>
      <Grid item xs={3}><Button {...rest} endIcon={<Icon/>} size="medium">{label}</Button></Grid>
      <Grid item xs={3}><IconButton {...rest} aria-label={label} size="medium"><Icon/></IconButton></Grid>
    </Grid>
    <Grid item container spacing={2}>
      <Grid item xs={3}><Button {...rest} size="large">{label}</Button></Grid>
      <Grid item xs={3}><Button {...rest} startIcon={<Icon/>} size="large">{label}</Button></Grid>
      <Grid item xs={3}><Button {...rest} endIcon={<Icon/>} size="large">{label}</Button></Grid>
      <Grid item xs={3}><IconButton {...rest} aria-label={label} size="medium"><Icon/></IconButton></Grid>
    </Grid>
    <Grid item container spacing={2}>
      <Grid item xs={3}><Button {...rest} size="large" disabled>{label}</Button></Grid>
      <Grid item xs={3}><Button {...rest} startIcon={<Icon/>} size="large" disabled>{label}</Button></Grid>
      <Grid item xs={3}><Button {...rest} endIcon={<Icon/>} size="large" disabled>{label}</Button></Grid>
      <Grid item xs={3}><IconButton {...rest} aria-label={label} size="medium" disabled><Icon/></IconButton></Grid>
    </Grid>
  </Grid>
)
const commonArgs = { label: 'Button' };
const disabledControlsArgTypes = {
  variant: { table: { disable: true } },
  size: { table: { disable: true } },
  disabled: { table: { disable: true } },
};

export const Default = PlaygroundTemplate.bind({});
Default.args = { ...commonArgs };

export const Contained = ButtonTemplate.bind({});
Contained.args = { ...commonArgs, variant: 'contained', color: 'primary' };
Contained.argTypes = disabledControlsArgTypes;

export const Outlined = ButtonTemplate.bind({});
Outlined.args = { ...commonArgs, variant: 'outlined', color: 'primary'  };
Outlined.argTypes = disabledControlsArgTypes;

export const Base = ButtonTemplate.bind({});
Base.args = { ...commonArgs, variant: 'text', color: 'primary'  };
Outlined.argTypes = disabledControlsArgTypes;