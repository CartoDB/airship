import React from 'react';
import { Checkbox, FormControlLabel, Grid } from '@material-ui/core';

export default {
  title: 'Common/Checkbox',
  component: Checkbox,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['primary', 'default' , 'secondary']
      }
    },
    checked: {
      control: {
        type: 'boolean'
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

const Template = ({ label, color = 'primary', checked = false, ...args }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox checked={checked} color={color}/>
      }
      label={label} {...args}/>
  )
}

const CheckboxTemplate = ({ color="primary", ...args }) => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox color={color}/>
            }
            label="Primary" {...args}/>
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox color={color} disabled/>
            }
            label="Disabled" {...args}/>
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox checked={true} color={color} disabled/>
            }
            label="Disabled checked" {...args}/>
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox checked={true} color={color} disabled indeterminate/>
            }
            label="Disabled indeterminate" {...args}/>
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox color={color} indeterminate/>
            }
            label="Indeterminate" {...args}/>
        </Grid>
      </Grid>
    </Grid>
  );
};


export const Playground = Template.bind({});
Playground.args = { label: 'Text' };

export const Default = CheckboxTemplate.bind({});
Default.args = { color: 'default' };

export const Primary = CheckboxTemplate.bind({});
Primary.args = { color: 'primary' };

export const Secondary = CheckboxTemplate.bind({});
Secondary.args = { color: 'secondary' };
