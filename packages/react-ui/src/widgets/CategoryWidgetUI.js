import React from 'react';
import PropTypes from 'prop-types';

export function CategoryWidgetUI (props) {
  const { selectedCategories = [] } = props;

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

  return (
    <div>
      {props.data.map((d, i) => {
        return (
          <div onClick={() => categoryClicked(d.category)} key={i}>
            {d.category} ----&gt; {d.value || 0}
          </div>
        );
      })}
    </div>
  );
}

CategoryWidgetUI.propTypes = {
  data: PropTypes.array.isRequired,
  selectedCategories: PropTypes.array.isRequired,
  onSelectedCategoriesChange: PropTypes.func
};
