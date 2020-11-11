import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from '@material-ui/core';

export default {
  title: 'Common/Radio',
  component: Radio,
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

const Template = ({ label, color, checked = false, ...args }) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup aria-label="gender" name="gender1">
        <FormControlLabel value="female" control={<Radio color={color} />} label="Female" />
        <FormControlLabel value="male" control={<Radio color={color} />} label="Male" />
        <FormControlLabel value="other" control={<Radio color={color} />} label="Other" />
        <FormControlLabel value="disabled" disabled control={<Radio color={color} />} label="(Disabled option)" />
      </RadioGroup>
    </FormControl>
  )
}

const RadioTemplate = ({ color, ...args }) => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Radio color={color} checked/>
            }
            label="Active"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Radio color={color}/>
            }
            label="Inactive"
            {...args}
          />
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Radio color={color} checked disabled/>
            }
            label="Disabled Active"
            {...args}
          />
        </Grid>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Radio color={color} disabled/>
            }
            label="Disabled Inactive"
            {...args}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};


export const Playground = Template.bind({});
Playground.args = { label: 'Text' };

export const Primary = RadioTemplate.bind({});
Primary.args = {};

export const Secondary = RadioTemplate.bind({});
Secondary.args = { color: 'secondary' };
