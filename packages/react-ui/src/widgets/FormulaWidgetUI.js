import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.h5,
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.text.primary,
  },
  unit: {
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(0.5),

    '&$before': {
      marginLeft: 0,
      marginRight: theme.spacing(0.5),
    }
  },
  before: {}
}));

function FormulaWidgetUI(props) {
  const classes = useStyles();

  const { data, formatter } = props;
  const value = formatter(data);
  return (
    <Box className={classes.root}>
      {typeof value === 'object' && value !== null
        ? props.unitBefore
          ? (<span><span className={`${classes.unit} ${classes.before}`}>{value.unit}</span>{value.value}</span>)
          : (<span>{value.value}<span className={classes.unit}>{value.unit}</span></span>)
        : (<span>{ value }</span>)
      }
    </Box>
  );
}

FormulaWidgetUI.defaultProps = {
  data: '-',
  formatter: (v) => v,
  unitBefore: false
};

FormulaWidgetUI.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
      ]),
      unit: PropTypes.string
    })
  ]),
  unitBefore: PropTypes.bool,
  formatter: PropTypes.func
};

export default FormulaWidgetUI;
