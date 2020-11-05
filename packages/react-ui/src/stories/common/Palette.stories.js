import React from 'react';
import { Box, Grid, Typography } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

export default {
  title: 'Getting Started/Palette',
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

const ActionTemplate = (args) => {
  const theme = useTheme();
  const colorDef = theme.palette.action;
  const textColor = theme.palette.common.black;
  return (
    <Grid container>
      <Box style={{ backgroundColor: colorDef.active, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColor  }}>Active<br/>{colorDef.active}</Typography></Box>
      <Box style={{ backgroundColor: colorDef.hover, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColor }}>Hover<br/>{colorDef.hover}</Typography></Box>
      <Box style={{ backgroundColor: colorDef.selected, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColor }}>Selected<br/>{colorDef.selected}</Typography></Box>
      <Box style={{ backgroundColor: colorDef.disabled, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColor }}>Disabled<br/>{colorDef.disabled}</Typography></Box>
      <Box style={{ backgroundColor: colorDef.disabledBackground, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColor }}>DisabledBackground<br/>{colorDef.disabledBackground}</Typography></Box>
      <Box style={{ backgroundColor: colorDef.focus, ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColor }}>Focus<br/>{colorDef.focus}</Typography></Box>
    </Grid>
  );
}

const GreyTemplate = (args) => {
  const theme = useTheme();
  const colorDef = theme.palette.customGrey;
  const textColorDark = theme.palette.common.white;
  const textColorLight = theme.palette.common.black;
  return (
    <Grid container>
      <Box style={{ backgroundColor: colorDef[900], ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColorDark  }}>N900<br/>{colorDef[900]}</Typography></Box>
      <Box style={{ backgroundColor: colorDef[800], ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColorDark  }}>N800<br/>{colorDef[800]}</Typography></Box>
      <Box style={{ backgroundColor: colorDef[700], ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColorDark  }}>N700<br/>{colorDef[700]}</Typography></Box>
      <Box style={{ backgroundColor: colorDef[600], ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColorDark  }}>N600<br/>{colorDef[600]}</Typography></Box>
      <Box style={{ backgroundColor: colorDef[500], ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColorDark  }}>N500<br/>{colorDef[500]}</Typography></Box>
      <Box style={{ backgroundColor: colorDef[400], ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColorLight  }}>N400<br/>{colorDef[400]}</Typography></Box>
      <Box style={{ backgroundColor: colorDef[300], ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColorLight  }}>N300<br/>{colorDef[300]}</Typography></Box>
      <Box style={{ backgroundColor: colorDef[200], ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColorLight  }}>N200<br/>{colorDef[200]}</Typography></Box>
      <Box style={{ backgroundColor: colorDef[100], ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColorLight  }}>N100<br/>{colorDef[100]}</Typography></Box>
      <Box style={{ backgroundColor: colorDef[50], ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColorLight  }}>N050<br/>{colorDef[50]}</Typography></Box>
      <Box style={{ backgroundColor: colorDef['A100'], ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColorLight  }}>A100<br/>{colorDef['A100']}</Typography></Box>
      <Box style={{ backgroundColor: colorDef['A200'], ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColorLight  }}>A200<br/>{colorDef['A200']}</Typography></Box>
      <Box style={{ backgroundColor: colorDef['A400'], ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColorDark  }}>A400<br/>{colorDef['A400']}</Typography></Box>
      <Box style={{ backgroundColor: colorDef['A700'], ...boxStyle }} {...args}><Typography variant="caption" style={{ color: textColorDark  }}>A700<br/>{colorDef['A700']}</Typography></Box>
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

export const Action = ActionTemplate.bind({});

export const CustomGrey = GreyTemplate.bind({});