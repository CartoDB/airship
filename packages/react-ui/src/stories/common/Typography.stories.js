import React from 'react';
import Typography from '@material-ui/core/Typography';

export default {
  title: 'Getting Started/02-Typography',
  component: Typography,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: [
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'subtitle1',
          'subtitle2',
          'body1',
          'body2',
          'button',
          'caption',
          'overline'
        ]
      }
    }
  }
};

const Template = (args) => <Typography {...args}>{args.text}</Typography>
const disabledControlsArgTypes = {
  variant: { table: { disable: true } }
}

export const Default = Template.bind({});
Default.args = { text: 'Default' };

export const H1 = Template.bind({});
H1.args = { variant: 'h1', text: 'H1 Headline' };
H1.argTypes = disabledControlsArgTypes;

export const H2 = Template.bind({});
H2.args = { variant: 'h2', text: 'H2 Headline' };
H2.argTypes = disabledControlsArgTypes;

export const H3 = Template.bind({});
H3.args = { variant: 'h3', text: 'H3 Headline' };
H3.argTypes = disabledControlsArgTypes;

export const H4 = Template.bind({});
H4.args = { variant: 'h4', text: 'H4 Headline' };
H4.argTypes = disabledControlsArgTypes;

export const H5 = Template.bind({});
H5.args = { variant: 'h5', text: 'H5 Headline' };
H5.argTypes = disabledControlsArgTypes;

export const H6 = Template.bind({});
H6.args = { variant: 'h6', text: 'H6 Headline' };
H6.argTypes = disabledControlsArgTypes;

export const Subtitle1 = Template.bind({});
Subtitle1.args = { variant: 'subtitle1', text: 'Subtitle 1' };
Subtitle1.argTypes = disabledControlsArgTypes;

export const Subtitle2 = Template.bind({});
Subtitle2.args = { variant: 'subtitle2', text: 'Subtitle 2' };
Subtitle2.argTypes = disabledControlsArgTypes;

export const Body1 = Template.bind({});
Body1.args = { variant: 'body1', text: 'Body 1' };
Body1.argTypes = disabledControlsArgTypes;

export const Body2 = Template.bind({});
Body2.args = { variant: 'body2', text: 'Body 2' };
Body2.argTypes = disabledControlsArgTypes;

export const Button = Template.bind({});
Button.args = { variant: 'button', text: 'Button' };
Button.argTypes = disabledControlsArgTypes;

export const Caption = Template.bind({});
Caption.args = { variant: 'caption', text: 'Caption' };
Caption.argTypes = disabledControlsArgTypes;

export const Overline = Template.bind({});
Overline.args = { variant: 'overline', text: 'Overline' };
Overline.argTypes = disabledControlsArgTypes;