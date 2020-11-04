import React from 'react';
import FormulaWidgetUI from '../../widgets/FormulaWidgetUI';

export default {
  title: 'Widgets/FormulaWidgetUI',
  component: FormulaWidgetUI,
  argTypes: {
    formatter: {
      table: {
        disable: true
      }
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

const Template = (args) => <FormulaWidgetUI {...args} />;

export const Empty = Template.bind({});
Empty.args = {};

export const Text = Template.bind({});
Text.args = { data: '$1000000'};

export const ValueUnit = Template.bind({});
ValueUnit.args = { data: { value: 1000000, unit: '$' } };

export const FormatterText = Template.bind({});
FormatterText.args = { data: 1000000, formatter: (v) => `$${v}` };

export const FormatterValueUnit = Template.bind({});
FormatterValueUnit.args = { data: 1000000, formatter: currencyFormatter };

export const FormatterValueUnitBefore = Template.bind({});
FormatterValueUnitBefore.args = { data: 1000000, formatter: currencyFormatter, unitBefore: true };