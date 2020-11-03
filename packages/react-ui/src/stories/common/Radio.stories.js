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

const Template = ({ label, color = 'primary', checked = false, ...args }) => {
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

const RadioTemplate = ({ ...args }) => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <Radio checked={true} color="default"/>
        </Grid>
        <Grid item xs={2}>
          <Radio checked={true} color="primary"/>
        </Grid>
        <Grid item xs={2}>
          <Radio checked={true} color="secondary"/>
        </Grid>
        <Grid item xs={2}>
          <Radio disabled/>
        </Grid>
        <Grid item xs={2}>
          <Radio checked={true} disabled/>
        </Grid>
      </Grid>
    </Grid>
  );
};
const RadioWithLabelTemplate = ({ ...args }) => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Radio checked={true} color="default"/>
            }
            label="Default" {...args}/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Radio checked={true} color="primary"/>
            }
            label="Primary" {...args}/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Radio checked={true} color="secondary"/>
            }
            label="Primary" {...args}/>
        </Grid>
        <Grid item xs={2}>
          <FormControlLabel
            control={
              <Radio disabled/>
            }
            label="Disabled" {...args}/>
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Radio checked={true} disabled/>
            }
            label="Disabled checked" {...args}/>
        </Grid>
      </Grid>
    </Grid>
  );
};


export const Playground = Template.bind({});
Playground.args = { label: 'Text' };

export const Basic = RadioTemplate.bind({});
Basic.args = { color: 'default' };

export const WithLabel = RadioWithLabelTemplate.bind({});
WithLabel.args = { color: 'default' };
