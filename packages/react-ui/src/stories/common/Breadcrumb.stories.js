import React from 'react';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { Home, CloudCircle, Style } from '@material-ui/icons';

export default {
  title: 'Common/Breadcrumbs',
  component: Breadcrumbs,
  argTypes: {
    maxItems: {
      control: {
        type: 'number'
      }
    },
    separator: {
      control: {
        type: 'select',
        options: ['/', '>', '-']
      }
    }
  }
}

const Template = ({ ...args }) => (
  <Breadcrumbs aria-label="breadcrumb" {...args}>
    <Link color="inherit" href="#">
      CARTO
    </Link>
    <Link color="inherit" href="#">
      Airship
    </Link>
    <Typography color="textPrimary">Storybook</Typography>
  </Breadcrumbs>
);

const WithIconsTemplate = ({ ...args }) => (
  <Breadcrumbs aria-label="breadcrumb" {...args}>
    <Link color="inherit" href="#">
      <Home/>
      CARTO
    </Link>
    <Link color="inherit" href="#">
      <CloudCircle/>
      Airship
    </Link>
    <Typography color="textPrimary">
      <Style/>
      Storybook
    </Typography>
  </Breadcrumbs>
);

export const Playground = Template.bind({});

export const WithIcons = WithIconsTemplate.bind({})
WithIcons.args = {}

export const Collapsed = Template.bind({})
Collapsed.args = {maxItems: 2}

