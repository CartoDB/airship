import React from 'react';
import { Grid, InputAdornment, SvgIcon, TextField, Typography } from '@material-ui/core';

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
const AccountIcon = (props) => (
  <SvgIcon {...props}>
    <g fill="#4d4d4d">
      <circle cx="10" cy="10" fill="transparent" strokeWidth="2px" stroke="#4d4d4d" r="6"/>
      <circle cx="10" cy="10" r="2"/>
    </g>
  </SvgIcon>
);
const EyeIcon = (props) => (
  <SvgIcon {...props}>
    <g transform="matrix(.02146 0 0 .02146 1 1)" fill="#4d4d4d">
      <path d="m466.07 161.53c-205.6 0-382.8 121.2-464.2 296.1-2.5 5.3-2.5 11.5 0 16.9 81.4 174.9 258.6 296.1 464.2 296.1 205.6 0 382.8-121.2 464.2-296.1 2.5-5.3 2.5-11.5 0-16.9-81.4-174.9-258.6-296.1-464.2-296.1m0 514.7c-116.1 0-210.1-94.1-210.1-210.1 0-116.1 94.1-210.1 210.1-210.1 116.1 0 210.1 94.1 210.1 210.1 0 116-94.1 210.1-210.1 210.1"/>
      <circle cx="466.08" cy="466.02" r="134.5"/>
    </g>
  </SvgIcon>
);

const Template = (args) => <TextField {...args}></TextField>;

const TextFieldTemplate = ({ ...rest }) => {
  const adornment = {
    startAdornment: (
      <InputAdornment position="start">
          <AccountIcon/>
      </InputAdornment>
    ),
    endAdornment: (
      <InputAdornment position="start">
          <EyeIcon/>
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
        <Grid item xs={2}><Typography>Error</Typography></Grid>
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

/*


<TextField
          id="standard-multiline-flexible"
          label="Multiline"
          multiline
          rowsMax={4}
          value={value}
          onChange={handleChange}
        />
        <TextField
          id="standard-textarea"
          label="Multiline Placeholder"
          placeholder="Placeholder"
          multiline
        />
        <TextField
          id="standard-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
        />
*/

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