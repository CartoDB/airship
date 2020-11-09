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
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium']
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
        <Grid item xs={2}><Typography>Active</Typography></Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item xs={3}>
            <TextField label="Placeholder" {...rest} focused/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Leading icon" {...rest} focused InputProps={{startAdornment: adornment.startAdornment}}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Trailing icon" {...rest} focused InputProps={{endAdornment: adornment.endAdornment}}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Both icons" {...rest} focused InputProps={adornment}/>
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
        <Grid item xs={2}><Typography>Has value</Typography></Grid>
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
        <Grid item xs={2}><Typography>Empty Error</Typography></Grid>
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
        <Grid item xs={2}><Typography>Value Error</Typography></Grid>
        <Grid item xs={10} container spacing={2}>
          <Grid item xs={3}>
            <TextField label="Placeholder" error defaultValue="Hello world" InputProps={{readOnly: true}} {...rest}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Leading icon" error {...rest} defaultValue="Hello world" InputProps={{startAdornment: adornment.startAdornment, readOnly: true}}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Trailing icon" error {...rest} defaultValue="Hello world" InputProps={{endAdornment: adornment.endAdornment, readOnly: true}}/>
          </Grid>
          <Grid item xs={3}>
            <TextField label="Both icons" error {...rest} defaultValue="Hello world" InputProps={{...adornment, readOnly: true}}/>
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

const commonArgs = { helperText: 'Helper text' };
const disabledControlsArgTypes = {
  variant: { table: { disable: true } },
  disabled: { table: { disable: true } },
  required: { table: { disable: true } },
};

export const Playground = Template.bind({});
Playground.args = { ...commonArgs, label: 'placeholder' };

export const Standard = TextFieldTemplate.bind({});
Standard.args = { ...commonArgs };
Standard.argTypes = disabledControlsArgTypes;

export const Small = TextFieldTemplate.bind({});
Small.args = { ...commonArgs, size: 'small' };
Small.argTypes = disabledControlsArgTypes;

export const Multiline = MultilineTemplate.bind({});
Multiline.args = {  };