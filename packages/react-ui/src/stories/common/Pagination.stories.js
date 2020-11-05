import React from 'react';
import { Pagination } from '@material-ui/lab';

export default {
  title: 'Common/Pagination',
  component: Pagination,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['default', 'outlined']
      }
    },
    shape: {
      control: {
        type: 'select',
        options: ['default', 'rounded']
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
  }
}
const Template = ({ ...args }) => {
  return (
    <div>
      <Pagination count={10} {...args} />
    </div>
  )
};

export const Playground = Template.bind({});


