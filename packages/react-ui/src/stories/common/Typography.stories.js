import React from 'react';
import Typography from '@material-ui/core/Typography';

export default {
  title: 'Common/Typography',
  component: Typography,
};

const Template = (args) => <Typography {...args}>{args.text}</Typography>

export const H1 = Template.bind({});
H1.args = { variant: 'h1', text: 'H1 Headline' };

export const H2 = Template.bind({});
H2.args = { variant: 'h2', text: 'H2 Headline' };

export const H3 = Template.bind({});
H3.args = { variant: 'h3', text: 'H3 Headline' };

export const H4 = Template.bind({});
H4.args = { variant: 'h4', text: 'H4 Headline' };

export const H5 = Template.bind({});
H5.args = { variant: 'h5', text: 'H5 Headline' };

export const H6 = Template.bind({});
H6.args = { variant: 'h6', text: 'H6 Headline' };

export const Subtitle1 = Template.bind({});
Subtitle1.args = { variant: 'subtitle1', text: 'Subtitle 1' };

export const Subtitle2 = Template.bind({});
Subtitle2.args = { variant: 'subtitle2', text: 'Subtitle 2' };

export const Body1 = Template.bind({});
Body1.args = { variant: 'body1', text: 'Body 1' };

export const Body2 = Template.bind({});
Body2.args = { variant: 'body2', text: 'Body 2' };

export const Button = Template.bind({});
Button.args = { variant: 'button', text: 'Button' };

export const Caption = Template.bind({});
Caption.args = { variant: 'caption', text: 'Caption' };

export const Overline = Template.bind({});
Overline.args = { variant: 'overline', text: 'Overline' };