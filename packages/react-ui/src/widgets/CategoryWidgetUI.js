import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Typography, makeStyles, withTheme } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    ...theme.typography.caption,
  },
  progressbar: {
    height: '5px',
    width: '100%',
    margin: theme.spacing(0.75, 0, 1, 0),
    borderRadius: '4px',
    backgroundColor: theme.palette.text.disabled,

    '& div': {
      height: '100%',
      borderRadius: '4px',
      backgroundColor: theme.palette.secondary.main,
    },
  },

  optionsSelectedBar: {
    marginBottom: theme.spacing(1),

    '& .MuiTypography-caption': {
      color: theme.palette.text.secondary,
    },

    '& .MuiButton-label': {
      ...theme.typography.caption,
    },
  },
}));

function CategoryWidgetUIRaw(props) {
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
          <Button className={classes.selectAllButton} onClick={() => clearCategories()}>
            All
          </Button>
        )}
      </Grid>
      {data.map((d, i) => {
        const value = formatter(d.value || 0);
        return (
          <Grid container onClick={() => categoryClicked(d.category)} key={i}>
            <Grid container item direction='row' justify='space-between'>
              <span>{labels[d.category] ? labels[d.category] : d.category}</span>
              {value.length ? (
                <span>
                  {value[0]}
                  {value[1]}
                </span>
              ) : (
                { value }
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

CategoryWidgetUIRaw.propTypes = {
  data: PropTypes.array.isRequired,
  formatter: PropTypes.func,
  labels: PropTypes.object,
  selectedCategories: PropTypes.array.isRequired,
  onSelectedCategoriesChange: PropTypes.func,
};

const CategoryWidgetUI = withTheme(CategoryWidgetUIRaw)

export default CategoryWidgetUI;
