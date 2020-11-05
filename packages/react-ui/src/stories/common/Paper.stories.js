import React from 'react';
import { makeStyles, Paper, Typography } from '@material-ui/core';

export default {
  title: 'Common/Paper',
  component: Paper,
  argTypes: {
    elevation: {
      control: {
        type: 'number',
      }
    }
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#fafafa',

    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

const Template = ({ ...args }) => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Paper {...args}/>
    </div>
  )
};

const PaperTemplate = ({ ...args }) => {
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <Paper elevation={0}>
        <Typography>elevation: 1</Typography>
      </Paper>
      <Paper>
        <Typography>elevation: 2</Typography>
        
      </Paper>
      <Paper elevation={3}>
        <Typography>elevation: 3</Typography>
      </Paper>
    </div>
  )
};

export const Playground = Template.bind({});
export const Elevation = PaperTemplate.bind({});

