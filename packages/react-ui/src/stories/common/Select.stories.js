import React from 'react';
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';

export default {
  title: 'Common/Select',
  component: Select,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default', 'filled', 'outlined']
      }
    },
    color: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary']
      }
    },
    required: {
      control: {
        type: 'boolean'
      }
    },
    disabled: {
      control: {
        type: 'boolean'
      }
    }
  }
}

const Template = ({ label = 'Age', required = false, ...args}) => (
  <FormControl required={required}>
    <InputLabel id="age-native-simple-label">{label}</InputLabel>
    <Select labelId="age-native-simple-label" {...args}>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  </FormControl>
);

const SelectTemplate = ({ ...args }) => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={10} container spacing={2}>
          <Grid item xs={3}>
            <FormControl>
              <InputLabel id="age-native-simple-label">Age</InputLabel>
              <Select labelId="age-native-simple-label" {...args}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>Some important helper text</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl required>
              <InputLabel id="age-native-simple-label">Age</InputLabel>
              <Select labelId="age-native-simple-label" {...args}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>This select is required</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl>
              <InputLabel id="age-native-simple-label">Age</InputLabel>
              <Select disabled labelId="age-native-simple-label" {...args}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <FormHelperText>This select is disabled</FormHelperText>
            </FormControl>
          </Grid>
        </Grid> 
      </Grid>
    </Grid>
  );
};

export const Playground = Template.bind({});

export const Default = SelectTemplate.bind({});
Default.args = { }

export const Filled = SelectTemplate.bind({});
Filled.args = { variant: 'filled' }

export const Outlined = SelectTemplate.bind({});
Outlined.args = { variant: 'outlined' }
