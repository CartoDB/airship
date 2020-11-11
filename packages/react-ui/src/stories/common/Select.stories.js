import React from 'react';
import {
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Typography,
  Select
} from '@material-ui/core';
import { Visibility } from '@material-ui/icons';

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
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium']
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

const Template = ({ label = 'Age', required, size, ...args}) => (
  <FormControl size={size} required={required}>
    <InputLabel id="age-native-simple-label">{label}</InputLabel>
    <Select labelId="age-native-simple-label" {...args}>
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </Select>
  </FormControl>
);

const SelectTemplate = ({ size, ...rest }) => {
  const adornment = {
    startAdornment: (
      <InputAdornment position="start">Kg</InputAdornment>
    ),
    endAdornment: (
      <InputAdornment position="end">
          <Visibility/>
      </InputAdornment>
    )
  }

  return (
    <Grid container spacing={6}>
      <Grid item container spacing={2}>
        <Grid item xs={2}><Typography>Empty</Typography></Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item xs={3}>
            <FormControl size={size}>
              <InputLabel id="simple-label">Label</InputLabel>
              <Select labelId="simple-label" {...rest}>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <MenuItem value={3}>Option 3</MenuItem>
              </Select>
              <FormHelperText>Helper text</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl size={size}>
              <InputLabel id="leading-simple-label">Leading adornment</InputLabel>
              <Select labelId="leading-simple-label" startAdornment={adornment.startAdornment} {...rest}>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <MenuItem value={3}>Option 3</MenuItem>
              </Select>
              <FormHelperText>Helper text</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}><Typography>Active</Typography></Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item xs={3}>
            <FormControl size={size} focused>
              <InputLabel id="simple-label">Label</InputLabel>
              <Select labelId="simple-label" {...rest}>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <MenuItem value={3}>Option 3</MenuItem>
              </Select>
              <FormHelperText>Helper text</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl size={size} focused>
              <InputLabel id="leading-simple-label">Leading adornment</InputLabel>
              <Select labelId="leading-simple-label" startAdornment={adornment.startAdornment} {...rest}>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <MenuItem value={3}>Option 3</MenuItem>
              </Select>
              <FormHelperText>Helper text</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}><Typography>Disabled</Typography></Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item xs={3}>
            <FormControl size={size} disabled>
              <InputLabel id="simple-label">Label</InputLabel>
              <Select labelId="simple-label" {...rest}>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <MenuItem value={3}>Option 3</MenuItem>
              </Select>
              <FormHelperText>Helper text</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl size={size} disabled>
              <InputLabel id="leading-simple-label">Leading adornment</InputLabel>
              <Select labelId="leading-simple-label" startAdornment={adornment.startAdornment} {...rest}>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <MenuItem value={3}>Option 3</MenuItem>
              </Select>
              <FormHelperText>Helper text</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}><Typography>Has value</Typography></Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item xs={3}>
            <FormControl size={size}>
              <InputLabel id="simple-label">Label</InputLabel>
              <Select labelId="simple-label" value={1} {...rest}>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <MenuItem value={3}>Option 3</MenuItem>
              </Select>
              <FormHelperText>Helper text</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl size={size}>
              <InputLabel id="leading-simple-label">Leading adornment</InputLabel>
              <Select labelId="leading-simple-label" startAdornment={adornment.startAdornment} value={1} {...rest}>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <MenuItem value={3}>Option 3</MenuItem>
              </Select>
              <FormHelperText>Helper text</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}><Typography>Empty Error</Typography></Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item xs={3}>
            <FormControl size={size} error>
              <InputLabel id="simple-label">Label</InputLabel>
              <Select labelId="simple-label" {...rest}>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <MenuItem value={3}>Option 3</MenuItem>
              </Select>
              <FormHelperText>Helper text</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl size={size} error>
              <InputLabel id="leading-simple-label">Leading adornment</InputLabel>
              <Select labelId="leading-simple-label" startAdornment={adornment.startAdornment} {...rest}>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <MenuItem value={3}>Option 3</MenuItem>
              </Select>
              <FormHelperText>Helper text</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={2}><Typography>Value Error</Typography></Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item xs={3}>
            <FormControl size={size} error>
              <InputLabel id="simple-label">Label</InputLabel>
              <Select labelId="simple-label" value={1} {...rest}>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <MenuItem value={3}>Option 3</MenuItem>
              </Select>
              <FormHelperText>Helper text</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl size={size} error>
              <InputLabel id="leading-simple-label">Leading adornment</InputLabel>
              <Select labelId="leading-simple-label" startAdornment={adornment.startAdornment} value={1} {...rest}>
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <MenuItem value={3}>Option 3</MenuItem>
              </Select>
              <FormHelperText>Helper text</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const Playground = Template.bind({});

export const Standard = SelectTemplate.bind({});
Standard.args = { }

export const Small = SelectTemplate.bind({});
Small.args = { size: 'small' }
