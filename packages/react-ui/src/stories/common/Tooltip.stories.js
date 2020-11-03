import React from 'react';
import { Tooltip, Button, Grid } from '@material-ui/core';

export default {
  title: 'Common/Tooltip',
  component: Tooltip,
  argTypes: {
    title: {
      defaultValue: 'Hello World!',
      control: {
        type: 'text',
      }
    },
    placement: {
      control: {
        type: 'select',
        options: ['top-start', 'top', 'top-end', 'left-start', 'left', 'left-end', 'right-start', 'right', 'right-end', 'bottom-start', 'bottom', 'bottom-end']
      }
    },
    arrow: {
      control: {
        type: 'boolean'
      }
    }
  }
}

const Template = ({ ...args }) => {
  return (
    <Tooltip {...args}>
      <Button>Sample</Button>
    </Tooltip>
  )
}

const TooltipTemplate = () => {
  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={4}>
          <Tooltip title="Tooltip on top" placement="top">
            <Button>Sample</Button>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Tooltip title="bottom with arrow" arrow placement="bottom">
            <Button>Sample</Button>
          </Tooltip>
        </Grid>
        <Grid item xs={4}>
          <Tooltip title="Very very very very very very very very very very very very very very long text" placement="bottom">
            <Button>Sample</Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  )
}



export const Playground = Template.bind({});
Playground.args = {};

export const Examples = TooltipTemplate.bind({});
