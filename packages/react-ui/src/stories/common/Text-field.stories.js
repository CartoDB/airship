import React from 'react';
import { Grid, InputAdornment, SvgIcon, TextField, Typography } from '@material-ui/core';
import { AccountCircle, Visibility } from '@material-ui/icons';

export default {
  title: 'Common/Text Field',
  component: TextField,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['standard', 'filled', 'outlined']
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
    },
    label: {
      control: {
        type: 'text'
      }
    }
  }
}

const Template = (args) => <TextField {...args}></TextField>;

const TextFieldTemplate = ({ ...rest }) => {
  const adornment = {
    startAdornment: (
      <InputAdornment position="start">
          <AccountCircle/>
      </InputAdornment>
    ),
    endAdornment: (
      <InputAdornment position="start">
          <Visibility/>
      </InputAdornment>
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={2}><Typography>Initial</Typography></Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item xs={3}>
            <TextField label="Placeholder" {...rest}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Leading icon" {...rest} InputProps={{startAdornment: adornment.startAdornment}}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Trailing icon" {...rest} InputProps={{endAdornment: adornment.endAdornment}}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Both icons" {...rest} InputProps={adornment}/>
          </Grid>
        </Grid> 
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={2}><Typography>Typed</Typography></Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item xs={3}>
            <TextField label="Placeholder" defaultValue="Hello world" {...rest}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Leading icon" {...rest} defaultValue="Hello world" InputProps={{startAdornment: adornment.startAdornment}}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Trailing icon" {...rest} defaultValue="Hello world" InputProps={{endAdornment: adornment.endAdornment}}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Both icons" {...rest} defaultValue="Hello world" InputProps={adornment}/>
          </Grid>
        </Grid> 
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={2}><Typography>Error</Typography></Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item xs={3}>
            <TextField label="Placeholder" error {...rest}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Leading icon" {...rest} error InputProps={{startAdornment: adornment.startAdornment}}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Trailing icon" {...rest} error InputProps={{endAdornment: adornment.endAdornment}}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Both icons" {...rest} error InputProps={adornment}/>
          </Grid>
        </Grid> 
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={2}><Typography>Disabled</Typography></Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item xs={3}>
            <TextField label="Placeholder" disabled {...rest}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Leading icon" {...rest} disabled InputProps={{startAdornment: adornment.startAdornment}}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Trailing icon" {...rest} disabled InputProps={{endAdornment: adornment.endAdornment}}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Both icons" {...rest} disabled InputProps={adornment}/>
          </Grid>
        </Grid> 
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={2}><Typography>Readonly</Typography></Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item xs={3}>
            <TextField label="Placeholder" defaultValue="Hello world" InputProps={{readOnly: true}} {...rest}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Leading icon" {...rest} defaultValue="Hello world" InputProps={{startAdornment: adornment.startAdornment, readOnly: true}}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Trailing icon" {...rest} defaultValue="Hello world" InputProps={{endAdornment: adornment.endAdornment, readOnly: true}}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Both icons" {...rest} defaultValue="Hello world" InputProps={{...adornment, readOnly: true}}/>
          </Grid>
        </Grid> 
      </Grid>
    </Grid>
  );
};

const MultilineTemplate = ({ ...rest }) => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <TextField label="Default" value="Hello World!" multiline />
        </Grid>
        <Grid item xs={4}>
          <TextField label="With max rows" value="Hello World!" rowsMax={4} multiline />
        </Grid>
        
        <Grid item xs={4}>
          <TextField label="Fixed rows" value="Hello World!" rows={4} multiline />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <TextField label="Default" variant="filled" value="Hello World!" multiline />
        </Grid>
        <Grid item xs={4}>
          <TextField label="With max rows" variant="filled" value="Hello World!" rowsMax={4} multiline />
        </Grid>
        
        <Grid item xs={4}>
          <TextField label="Fixed rows" variant="filled" value="Hello World!" rows={4} multiline />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <TextField label="Default" variant="outlined" value="Hello World!" multiline />
        </Grid>
        <Grid item xs={4}>
          <TextField label="With max rows" variant="outlined" value="Hello World!" rowsMax={4} multiline />
        </Grid>
        
        <Grid item xs={4}>
          <TextField label="Fixed rows" variant="outlined" value="Hello World!" rows={4} multiline />
        </Grid>
      </Grid>
    </Grid>
  );
};

const disabledControlsArgTypes = {
  variant: { table: { disable: true } },
  disabled: { table: { disable: true } },
  required: { table: { disable: true } },
};

export const Playground = Template.bind({});
Playground.args = { label: 'placeholder' };

export const Standard = TextFieldTemplate.bind({});
Standard.argTypes = disabledControlsArgTypes;

export const Filled = TextFieldTemplate.bind({});
Filled.args = { variant: 'filled' };
Filled.argTypes = disabledControlsArgTypes;

export const Outlined = TextFieldTemplate.bind({});
Outlined.args = { variant: 'outlined' };
Outlined.argTypes = disabledControlsArgTypes;

export const Multiline = MultilineTemplate.bind({});
Multiline.args = {  };