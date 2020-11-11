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

const SwitchTemplate = ({ color, ...args }) => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Switch color={color}/>
            }
            label="Off" {...args}/>
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Switch color={color} checked/>
            }
            label="On" {...args}/>
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Switch color={color} disabled/>
            }
            label="Disabled Off" {...args}/>
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Switch color={color} checked disabled/>
            }
            label="Disabled On" {...args}/>
        </Grid>
      </Grid>
    </Grid>
  );
};


export const Playground = Template.bind({});
Playground.args = { label: 'Text' };

export const Primary = SwitchTemplate.bind({});
Primary.args = {};

export const Secondary = SwitchTemplate.bind({});
Secondary.args = { color: 'secondary' };
