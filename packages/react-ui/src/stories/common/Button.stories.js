import React from 'react';
import { Button, IconButton, Grid, SvgIcon } from '@material-ui/core';

export default {
  title: 'Common/Button',
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
    },
    label: {
      control: {
        type: 'text'
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
const ButtonTemplate = ({ label, icon, ...rest }) => {
  const smallLabel = label ? label : 'Small button';
  const mediumLabel = label ? label : 'Normal button';
  const largeLabel = label ? label : 'Large button';
  const disabledLabel = label ? label : 'Disabled button';

  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={3}><Button {...rest} size="small">{smallLabel}</Button></Grid>
        <Grid item xs={3}><Button {...rest} startIcon={<Icon/>} size="small">{smallLabel}</Button></Grid>
        <Grid item xs={3}><Button {...rest} endIcon={<Icon/>} size="small">{smallLabel}</Button></Grid>
        <Grid item xs={3}><IconButton {...rest} aria-label={smallLabel} size="small"><Icon/></IconButton></Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={3}><Button {...rest} size="medium">{mediumLabel}</Button></Grid>
        <Grid item xs={3}><Button {...rest} startIcon={<Icon/>} size="medium">{mediumLabel}</Button></Grid>
        <Grid item xs={3}><Button {...rest} endIcon={<Icon/>} size="medium">{mediumLabel}</Button></Grid>
        <Grid item xs={3}><IconButton {...rest} aria-label={mediumLabel} size="medium"><Icon/></IconButton></Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={3}><Button {...rest} size="large">{largeLabel}</Button></Grid>
        <Grid item xs={3}><Button {...rest} startIcon={<Icon/>} size="large">{largeLabel}</Button></Grid>
        <Grid item xs={3}><Button {...rest} endIcon={<Icon/>} size="large">{largeLabel}</Button></Grid>
        <Grid item xs={3}><IconButton {...rest} aria-label={largeLabel} size="medium"><Icon/></IconButton></Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={3}><Button {...rest} size="large" disabled>{disabledLabel}</Button></Grid>
        <Grid item xs={3}><Button {...rest} startIcon={<Icon/>} size="large" disabled>{disabledLabel}</Button></Grid>
        <Grid item xs={3}><Button {...rest} endIcon={<Icon/>} size="large" disabled>{disabledLabel}</Button></Grid>
        <Grid item xs={3}><IconButton {...rest} aria-label={disabledLabel} size="medium" disabled><Icon/></IconButton></Grid>
      </Grid>
    </Grid>
  );
};
const disabledControlsArgTypes = {
  variant: { table: { disable: true } },
  size: { table: { disable: true } },
  disabled: { table: { disable: true } },
};

export const Default = PlaygroundTemplate.bind({});
Default.args = { label: 'Button' };

export const Contained = ButtonTemplate.bind({});
Contained.args = { variant: 'contained' };
Contained.argTypes = disabledControlsArgTypes;

export const Outlined = ButtonTemplate.bind({});
Outlined.args = { variant: 'outlined'  };
Outlined.argTypes = disabledControlsArgTypes;

export const Base = ButtonTemplate.bind({});
Base.args = { variant: 'text'  };
Base.argTypes = disabledControlsArgTypes;

export const ContainedPrimary = ButtonTemplate.bind({});
ContainedPrimary.args = { variant: 'contained', color: 'primary' };
ContainedPrimary.argTypes = disabledControlsArgTypes;

export const OutlinedPrimary = ButtonTemplate.bind({});
OutlinedPrimary.args = { variant: 'outlined', color: 'primary'  };
OutlinedPrimary.argTypes = disabledControlsArgTypes;

export const BasePrimary = ButtonTemplate.bind({});
BasePrimary.args = { variant: 'text', color: 'primary'  };
BasePrimary.argTypes = disabledControlsArgTypes;