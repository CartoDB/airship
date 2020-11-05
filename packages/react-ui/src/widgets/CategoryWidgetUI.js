import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Link, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.body2,
  },

  element: {
    cursor: 'pointer',

    '&$unselected': {
      color: theme.palette.text.disabled,
      
      '& $progressbar div': {
        backgroundColor: theme.palette.text.disabled
      }
    },

    '&:hover $progressbar div': {
      backgroundColor: theme.palette.secondary.dark
    }
  },

  label: {
    fontWeight: theme.typography.fontWeightMedium
  },

  progressbar: {
    height: theme.spacing(0.5),
    width: '100%',
    margin: theme.spacing(0.5, 0, 1, 0),
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.action.disabledBackground,

    '& div': {
      width: 0,
      height: '100%',
      borderRadius: theme.spacing(0.5),
      backgroundColor: theme.palette.secondary.main,
      transition: `background-color ${theme.transitions.easing.sharp} ${theme.transitions.duration.shortest}ms,
                   width ${theme.transitions.easing.sharp} ${theme.transitions.duration.complex}ms`,
    },
  },

  unselected: {},

  optionsSelectedBar: {
    marginBottom: theme.spacing(2),

    '& .MuiTypography-caption': {
      color: theme.palette.text.secondary,
    },

    '& .MuiButton-label': {
      ...theme.typography.caption,
    },
  },

  selectAllButton: {
    ...theme.typography.caption,
    cursor: 'pointer'
  }
}));

function CategoryWidgetUI(props) {
  const { data = [], selectedCategories = [], formatter = (v) => v, labels = {} } = props;
  const classes = useStyles();

  const categoryClicked = (category) => {
    let categories;

    if (selectedCategories.indexOf(category) < 0) {
      categories = [...selectedCategories, category];
    } else {
      categories = selectedCategories.filter((c) => c !== category);
    }

    if (props.onSelectedCategoriesChange) {
      props.onSelectedCategoriesChange(categories);
    }
  };

  const clearCategories = () => {
    props.onSelectedCategoriesChange([]);
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        direction='row'
        justify='space-between'
        alignItems='center'
        className={classes.optionsSelectedBar}
      >
        <Typography variant='caption'>
          {selectedCategories.length ? selectedCategories.length : 'All'} selected
        </Typography>
        {selectedCategories.length > 0 && (
          <Link className={classes.selectAllButton} onClick={() => clearCategories()}>
            All
          </Link>
        )}
      </Grid>
      {data.map((d, i) => {
        const value = formatter(d.value || 0);
        return (
          <Grid
            container
            onClick={() => categoryClicked(d.category)}
            key={i}
            className={
              `${classes.element}
               ${selectedCategories.length > 0 && selectedCategories.indexOf(d.category) === -1 ? classes.unselected : ''}`
            }>
            <Grid container item direction='row' justify='space-between'>
              <span className={classes.label}>{labels[d.category] ? labels[d.category] : d.category}</span>
              { typeof value === 'object' && value !== null ? (
                <span>
                  {value.unit}
                  {value.value}
                </span>
              ) : (
                <span>{ value }</span>
              )}
            </Grid>
            <Grid item className={classes.progressbar}>
              <div
                style={{ width: `${((d.value || 0) * 100) / (data[0].value || 1)}%` }}
              ></div>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}

CategoryWidgetUI.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.string.isRequired,
      value: PropTypes.number
    })
  ).isRequired,
  formatter: PropTypes.func,
  labels: PropTypes.object,
  selectedCategories: PropTypes.array,
  onSelectedCategoriesChange: PropTypes.func,
};

export default CategoryWidgetUI;
