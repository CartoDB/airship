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

const CheckboxTemplate = ({ color, ...args }) => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox color={color} checked/>
            }
            label="Active"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox color={color}/>
            }
            label="Inactive"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox color={color} checked indeterminate/>
            }
            label="Indeterminate"
            {...args}
          />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox color={color} checked disabled/>
            }
            label="Disabled Active"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox color={color} disabled/>
            }
            label="Disabled Inactive"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox color={color} checked indeterminate disabled/>
            }
            label="Disabled Indeterminate"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};


export const Playground = Template.bind({});
Playground.args = { label: 'Text' };

export const Primary = CheckboxTemplate.bind({});
Primary.args = { color: 'primary' };

export const Secondary = CheckboxTemplate.bind({});
Secondary.args = { color: 'secondary' };
