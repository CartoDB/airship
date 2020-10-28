import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export default {
  title: '1 Getting Started/01-Palette',
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

const boxStyle = { height: 80, width: 186, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' };

const ColorTemplate = ({colorVariant, shade, ...args}) => {
  const theme = useTheme();
  const colorDef = theme.palette[colorVariant];
  return (
    <Grid container>
      <Box style={{ backgroundColor: colorDef.light, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: colorDef.contrastText }}>Light<br/>{colorDef.light}</Typography></Box>
      <Box style={{ backgroundColor: colorDef.main, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: colorDef.contrastText  }}>Main<br/>{colorDef.main}</Typography></Box>
      <Box style={{ backgroundColor: colorDef.dark, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: colorDef.contrastText  }}>Dark<br/>{colorDef.dark}</Typography></Box>
    </Grid>
  );
}

const CommonTemplate = (args) => {
  const theme = useTheme();
  const colorDef = theme.palette.common;

  return (
    <Grid container>
      <Box style={{ backgroundColor: colorDef.black, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: colorDef.white  }}>Black<br/>{colorDef.black}</Typography></Box>
      <Box style={{ backgroundColor: colorDef.white, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: colorDef.black }}>White<br/>{colorDef.white}</Typography></Box>
    </Grid>
  );
}

const TextTemplate = (args) => {
  const theme = useTheme();
  const colorDef = theme.palette.text;
  const textColor = theme.palette.common.white;
  return (
    <Grid container>
      <Box style={{ backgroundColor: colorDef.primary, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColor }}>Primary<br/>{colorDef.primary}</Typography></Box>
      <Box style={{ backgroundColor: colorDef.secondary, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColor  }}>Secondary<br/>{colorDef.secondary}</Typography></Box>
      <Box style={{ backgroundColor: colorDef.hint, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColor  }}>Hint<br/>{colorDef.hint}</Typography></Box>
      <Box style={{ backgroundColor: colorDef.disabled, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColor  }}>Disabled<br/>{colorDef.disabled}</Typography></Box>
    </Grid>
  );
}

const BackgroundTemplate = (args) => {
  const theme = useTheme();
  const colorDef = theme.palette.background;
  const textColor = theme.palette.common.black;
  return (
    <Grid container>
      <Box style={{ backgroundColor: colorDef.default, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColor  }}>Default<br/>{colorDef.default}</Typography></Box>
      <Box style={{ backgroundColor: colorDef.paper, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColor }}>Paper<br/>{colorDef.paper}</Typography></Box>
    </Grid>
  );
}

export const Default = ColorTemplate.bind({});
Default.args = { colorVariant: 'primary' };

export const Primary = ColorTemplate.bind({});
Primary.args = { colorVariant: 'primary' };

export const Secondary = ColorTemplate.bind({});
Secondary.args = { colorVariant: 'secondary' };

export const Error = ColorTemplate.bind({});
Error.args = { colorVariant: 'error' };

export const Warning = ColorTemplate.bind({});
Warning.args = { colorVariant: 'warning' };

export const Info = ColorTemplate.bind({});
Info.args = { colorVariant: 'info' };

export const Success = ColorTemplate.bind({});
Success.args = { colorVariant: 'success' };

export const Common = CommonTemplate.bind({});

export const TextLight = TextTemplate.bind({});

export const Background = BackgroundTemplate.bind({});