import React from 'react';
import PropTypes from 'prop-types';
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

  const { data, formatter } = props;
  const value = formatter(data);
  return (
    <Box
      fontFamily='h4.fontFamily'
      fontWeight='fontWeightLight'
      fontSize='h4.fontSize'
      className={classes.root}
    >
      {typeof value === 'object' && value !== null ? (
        <span>
          <span className={classes.unit}>{value.unit}</span>
          {value.value}
        </span>
      ) : (
        <span>{ value }</span>
      )}
    </Box>
  );
}

FormulaWidgetUI.defaultProps = {
  data: '-',
  formatter: (v) => v
};

FormulaWidgetUI.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]).isRequired,
      unit: PropTypes.string.isRequired
    })
  ]),
  formatter: PropTypes.func
};

export default FormulaWidgetUI;
