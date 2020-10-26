import React from 'react';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import rgbToHex from '../utils/rgbToHex';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.caption,
    padding: theme.spacing(1.5),
    backgroundColor: theme.palette.common.white,
  },

  element: {
    ...theme.typography.overline,
    textTransform: 'none',
    color: theme.palette.text.secondary,
    padding: theme.spacing(0.25, 0),
  },

  dot: {
    flex: '0 0 auto',
    width: 8,
    height: 8,
    marginRight: theme.spacing(1),
  },
}));

function CategoryLegendUI(props) {
  const classes = useStyles();
  const { categories } = props;

  return (
    <Paper elevation={4} className={classes.root}>
      <Typography variant='caption'>{categories.title}</Typography>
      {Object.entries(categories.colors).map((elem, i) => (
        <Grid
          container
          direction='row'
          alignItems='center'
          className={classes.element}
          key={i}
        >
          <div
            className={classes.dot}
            style={{
              borderRadius: categories.geomType === 'point' ? '50%' : '0%',
              backgroundColor: rgbToHex(elem[1]),
            }}
          ></div>
          {categories.labels[elem[0]]}
        </Grid>
      ))}
    </Paper>
  );
}

export default CategoryLegendUI;
