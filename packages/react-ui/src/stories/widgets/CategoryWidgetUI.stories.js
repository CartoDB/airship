import React from 'react';
import CategoryWidgetUI from '../../widgets/CategoryWidgetUI';

export default {
  title: 'Widgets/CategoryWidgetUI',
  component: CategoryWidgetUI,
  argTypes: {
  //   data: {
  //     table: { disable: true }
  //   },
  //   formatter: {
  //     table: { disable: true }
  //   },
  //   labels: {
  //     table: { disable: true }
  //   },
    selectedCategories: {
      table: { disable: true }
    },
    onSelectedCategoriesChange: {
      table: { disable: true }
    }
  }
};

const currencyFormatter = (v) => {
  const moneyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const formattedParts = moneyFormatter.formatToParts(v);
  const valueParted = formattedParts.reduce(
    (acum, part) => {
      switch (part.type) {
        case 'currency':
          acum.unit = part.value;
          break;
        case 'integer':
        case 'group':
        case 'decimal':
        case 'fraction':
          acum.value += part.value;
          break;
        default: // do nothing
      }
      return acum;
    },
    { unit: '', value: '' }
  );
  return valueParted;
};

const Template = (args) => <CategoryWidgetUI {...args}></CategoryWidgetUI>;
const data = [
  { category: 'categoryA', value: 150 },
  { category: 'categoryB', value: 120 },
  { category: 'categoryC', value: 100 },
  { category: 'categoryD', value: 90 },
];

const dataFiltered = [
  { category: 'categoryB', value: 120 },
  { category: 'categoryC', value: 100 },
  { category: 'categoryA', value: null },
  { category: 'categoryD', value: null },
];

export const Default = Template.bind({});
Default.args = { data };

export const OnlyData = Template.bind({});
OnlyData.args = { data };

export const WithFormatter = Template.bind({});
WithFormatter.args = { data, formatter: currencyFormatter };

export const WithCustomLabels = Template.bind({});
WithCustomLabels.args = {
  data,
  labels: {
    categoryA: 'Cat. A',
    categoryB: 'Cat. B',
    categoryC: 'Cat. C',
    categoryD: 'Cat. D',
  }
};

export const WithSelectedCategories = Template.bind({});
WithSelectedCategories.args = {
  data: dataFiltered,
  selectedCategories: ['categoryB', 'categoryC'],
  onSelectedCategoriesChange: (categories) => console.log(categories)
};