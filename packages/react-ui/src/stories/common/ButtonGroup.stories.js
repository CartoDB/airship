import React from 'react';
import { Button, IconButton, Grid, SvgIcon, ButtonGroup } from '@material-ui/core';

export default {
  title: 'Common/Button Group',
  component: ButtonGroup,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['text', 'contained', 'outlined']
      }
    },
    orientation: {
      control: {
        type: 'select',
        options: ['horizontal', 'vertical']
      }
    },
    color: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary']
      }
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large']
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
};

const Icon = (props) => <SvgIcon {...props}><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></SvgIcon>;
const PlaygroundTemplate = ({ label, icon, ...rest}) => (
  <Grid container spacing={2}>
    <ButtonGroup {...rest}>
      <Button>{label}</Button>
      <Button>{label}</Button>
      <Button>{label}</Button>
    </ButtonGroup>
  </Grid>
);
const ButtonTemplate = ({ label, icon, ...rest }) => {
  const smallLabel = label ? label : 'Small button';
  const mediumLabel = label ? label : 'Normal button';
  const largeLabel = label ? label : 'Large button';
  const disabledLabel = label ? label : 'Disabled button';

  return (
    <Grid container spacing={2}>
      <Grid item container>
        <ButtonGroup {...rest} size="small">
          <Button>{smallLabel}</Button>
          <Button>{smallLabel}</Button>
          <Button>{smallLabel}</Button>
        </ButtonGroup>
      </Grid>
      <Grid item container>
        <ButtonGroup {...rest} size="medium">
          <Button>{mediumLabel}</Button>
          <Button>{mediumLabel}</Button>
          <Button>{mediumLabel}</Button>
        </ButtonGroup>
      </Grid>
      <Grid item container>
        <ButtonGroup {...rest} size="large">
          <Button>{largeLabel}</Button>
          <Button>{largeLabel}</Button>
          <Button>{largeLabel}</Button>
        </ButtonGroup>
      </Grid>
      <Grid item container>
        <ButtonGroup {...rest} size="large">
          <Button>{largeLabel}</Button>
          <Button disabled>{disabledLabel}</Button>
          <Button>{largeLabel}</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};
const disabledControlsArgTypes = {
  variant: { table: { disable: true } },
  size: { table: { disable: true } },
  disabled: { table: { disable: true } },
};

export const Default = PlaygroundTemplate.bind({});
Default.args = { label: 'Button' };

export const Contained = ButtonTemplate.bind({});
Contained.args = { variant: 'contained' };
Contained.argTypes = disabledControlsArgTypes;

export const Outlined = ButtonTemplate.bind({});
Outlined.args = { variant: 'outlined'  };
Outlined.argTypes = disabledControlsArgTypes;

export const Base = ButtonTemplate.bind({});
Base.args = { variant: 'text'  };
Base.argTypes = disabledControlsArgTypes;

export const ContainedPrimary = ButtonTemplate.bind({});
ContainedPrimary.args = { variant: 'contained', color: 'primary' };
ContainedPrimary.argTypes = disabledControlsArgTypes;

export const OutlinedPrimary = ButtonTemplate.bind({});
OutlinedPrimary.args = { variant: 'outlined', color: 'primary'  };
OutlinedPrimary.argTypes = disabledControlsArgTypes;

export const BasePrimary = ButtonTemplate.bind({});
BasePrimary.args = { variant: 'text', color: 'primary'  };
BasePrimary.argTypes = disabledControlsArgTypes;