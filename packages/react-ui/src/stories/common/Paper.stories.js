import React from 'react';
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';

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
    backgroundColor: theme.palette.customGrey[50],

    '& .MuiPaper': {
      height: 100,
      width: 100
    }
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
    <Grid container spacing={6} className={classes.root}>
      <Grid container item spacing={2} className={classes.root}>
        <Grid item xs={1}>
          <Paper elevation={0}>
            <Typography>elevation: 0</Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper elevation={1}>
            <Typography>elevation: 1</Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper elevation={2}>
            <Typography>elevation: 2</Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper elevation={4}>
            <Typography>elevation: 4</Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper elevation={8}>
            <Typography>elevation: 8</Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper elevation={16}>
            <Typography>elevation: 16</Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper elevation={24}>
            <Typography>elevation: 24</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid container item spacing={6} className={classes.root}>
        <Grid item xs={1}>
          <Paper elevation={0} square>
            <Typography>elevation: 0</Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper elevation={1} square>
            <Typography>elevation: 1</Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper elevation={2} square>
            <Typography>elevation: 2</Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper elevation={4} square>
            <Typography>elevation: 4</Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper elevation={8} square>
            <Typography>elevation: 8</Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper elevation={16} square>
            <Typography>elevation: 16</Typography>
          </Paper>
        </Grid>
        <Grid item xs={1}>
          <Paper elevation={24} square>
            <Typography>elevation: 24</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
};

export const Playground = Template.bind({});
export const Elevation = PaperTemplate.bind({});

