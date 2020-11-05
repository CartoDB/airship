import React from 'react';
import { Tab, Tabs } from '@material-ui/core';

export default {
  title: 'Common/Tabs',
  component: Tabs,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['standard', 'filled', 'outlined']
      }
    },
    indicatorColor: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary']
      }
    },
    textColor: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary']
      }
    }
  }
}

const Template = ({ ...args }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="tabs example"
      {...args}
    >
      <Tab label="Tab 1" />
      <Tab label="Tab 2" />
      <Tab label="Tab 3" disabled/>
      <Tab label="Tab 3" />
    </Tabs>
  )
};

export const Playground = Template.bind({});

