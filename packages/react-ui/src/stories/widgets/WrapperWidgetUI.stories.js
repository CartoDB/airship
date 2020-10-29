import React from 'react';
import { Typography } from '@material-ui/core';
import WrapperWidgetUI from '../../widgets/WrapperWidgetUI';

export default {
  title: 'Widgets/01 - WrapperWidgetUI',
  component: WrapperWidgetUI,
  argTypes: {
    actions: {
      table: { disable: true }
    },
    options: {
      table: { disable: true }
    },
    children: {
      table: { disable: true }
    }
  }
};

const Icon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
<g fill="none" fill-rule="evenodd">
    <g fill="#036FE2">
        <g>
            <g>
                <g>
                    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm0 3c.6 0 3 5.139 3 6.667C15 15.507 13.657 17 12 17s-3-1.492-3-3.333C9 12.139 11.4 7 12 7z" transform="translate(-375 -443) translate(97 427) translate(272 10) translate(6 6)"/>
                </g>
            </g>
        </g>
    </g>
</g>
</svg>);
const Template = (args) => <WrapperWidgetUI {...args}><Typography>Your Content</Typography></WrapperWidgetUI>;

export const Default = Template.bind({});
Default.args = { title: 'Default wrapper' };

export const OnlyTitle = Template.bind({});
OnlyTitle.args = { title: 'Default wrapper' };

export const WithActions = Template.bind({});
WithActions.args = { title: 'Wrapper with actions', actions: [
  { id: 'a1', name: 'Autostyle', icon: (<Icon />), action: () => alert('Action!') }
] };

export const WithOptions = Template.bind({});
WithOptions.args = { title: 'Wrapper with options', options: [
  { id: 'o1', name: 'Option 1', action: () => alert('Option 1!') },
  { id: 'o2', name: 'Option 2', action: () => alert('Option 2!') },
] };

export const WithActionsAndOptions = Template.bind({});
WithActionsAndOptions.args = {
  title: 'Wrapper with actions and options',
  actions: [
    { id: 'a1', name: 'Autostyle', icon: (<Icon />), action: () => alert('Action!') }
  ],
  options: [
    { id: 'o1', name: 'Option 1', action: () => alert('Option 1!') },
    { id: 'o2', name: 'Option 2', action: () => alert('Option 2!') },
  ]
};