import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// const color = HUE[SHADE];

export default {
  title: 'Common/Palette',
  component: Box,
  argTypes: {
    colorVariant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'error', 'warning', 'info', 'success']
      }
    }
  }
};

const Template = ({colorVariant, shade, ...args}) => {
  const theme = useTheme();
  const colorDef = theme.palette[colorVariant];
  const boxStyle = { height: 64, width: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }
  return (<Grid container>
    <Box style={{ backgroundColor: colorDef.light, ...boxStyle }} {...args}><Typography style={{ color: colorDef.contrastText }}>Light</Typography></Box>
    <Box style={{ backgroundColor: colorDef.main, ...boxStyle }} {...args}><Typography style={{ color: colorDef.contrastText  }}>Main</Typography></Box>
    <Box style={{ backgroundColor: colorDef.dark, ...boxStyle }} {...args}><Typography style={{ color: colorDef.contrastText  }}>Dark</Typography></Box>
    </Grid>);
}

export const Primary = Template.bind({});
Primary.args = { colorVariant: 'primary' };

export const Secondary = Template.bind({});
Secondary.args = { colorVariant: 'secondary' };

export const Error = Template.bind({});
Error.args = { colorVariant: 'error' };

export const Warning = Template.bind({});
Warning.args = { colorVariant: 'warning' };

export const Info = Template.bind({});
Info.args = { colorVariant: 'info' };

export const Success = Template.bind({});
Success.args = { colorVariant: 'success' };