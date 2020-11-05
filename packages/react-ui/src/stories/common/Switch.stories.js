import React from 'react';
import { FormControlLabel, Grid, Switch } from '@material-ui/core';

export default {
  title: 'Common/Switch',
  component: Switch,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary']
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
}

const Template = ({ label, color, checked, ...args }) => {
  return (
    <FormControlLabel
      control={
        <Switch color={color}/>
      }
      label={label} {...args}/>
  )
}

const SwitchTemplate = ({ ...args }) => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Switch checked={true} color="default"/>
        </Grid>
        <Grid item xs={2}>
          <Switch checked={true} color="primary"/>
        </Grid>
        <Grid item xs={2}>
          <Switch checked={true} color="secondary"/>
        </Grid>
        <Grid item xs={2}>
          <Switch disabled/>
        </Grid>
        <Grid item xs={2}>
          <Switch checked={true} disabled/>
        </Grid>
      </Grid>
    </Grid>
  );
};
const SwitchWithLabelTemplate = ({ ...args }) => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Switch checked={true} color="default"/>
            }
            label="Default" {...args}/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Switch checked={true} color="primary"/>
            }
            label="Primary" {...args}/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Switch checked={true} color="secondary"/>
            }
            label="Primary" {...args}/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Switch disabled/>
            }
            label="Disabled" {...args}/>
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Switch checked={true} disabled/>
            }
            label="Disabled checked" {...args}/>
        </Grid>
      </Grid>
    </Grid>
  );
};


export const Playground = Template.bind({});
Playground.args = { label: 'Text' };

export const Basic = SwitchTemplate.bind({});
Basic.args = { color: 'default' };

export const WithLabel = SwitchWithLabelTemplate.bind({});
WithLabel.args = { color: 'default' };
