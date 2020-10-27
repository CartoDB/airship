import React from 'react';
import { Button, IconButton, SvgIcon } from '@material-ui/core';

export default {
  title: 'Common/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['text', 'contained', 'outlined']
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
    icon: {
      control: {
        type: 'boolean'
      }
    }
  }
};

const Icon = (props) => <SvgIcon {...props}><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></SvgIcon>;
const ButtonTemplate = ({ label, icon, ...rest }) => <Button {...rest} startIcon={ icon ? (<Icon/>) : null }>{label}</Button>
const IconButtonTemplate = ({ label, icon, ...rest }) => <IconButton {...rest} aria-label={label}><Icon/></IconButton>
const commonArgs = { label: 'Button' }

export const DefaultButton = ButtonTemplate.bind({});
DefaultButton.args = { ...commonArgs };

export const ContainedButton = ButtonTemplate.bind({});
ContainedButton.args = { ...commonArgs, variant: 'contained', color: 'primary' };

export const OutlinedButton = ButtonTemplate.bind({});
OutlinedButton.args = { ...commonArgs, variant: 'outlined', color: 'primary'  };

export const OnlyIconButton = IconButtonTemplate.bind({});
OnlyIconButton.args = { ...commonArgs };