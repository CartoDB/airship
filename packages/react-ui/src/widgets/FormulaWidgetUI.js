import React from 'react';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
  },
  unit: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(0.5),
  },
}));

function FormulaWidgetUI(props) {
  const classes = useStyles();

  const { data, formatter = (v) => v } = props;
  const value = formatter(data);
  return (
    <Box
      fontFamily='h4.fontFamily'
      fontWeight='fontWeightLight'
      fontSize='h4.fontSize'
      className={classes.root}
    >
      {value.length ? (
        <span>
          <span className={classes.unit}>{value[0]}</span>
          {value[1]}
        </span>
      ) : (
        { value }
      )}
    </Box>
  );
}

export default FormulaWidgetUI;
