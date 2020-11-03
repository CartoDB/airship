import React from 'react';
import  Autocomplete  from '@material-ui/lab/Autocomplete';
import { Grid, TextField } from '@material-ui/core';

export default {
  title: 'Common/Autocomplete',
  component: Autocomplete,
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['standard', 'filled', 'outlined']
      }
    },
    color: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary']
      }
    },
    required: {
      control: {
        type: 'boolean'
      }
    },
    disabled: {
      control: {
        type: 'boolean'
      }
    }
  }
}

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 }
];

const Template = ({ label = 'Choose films', disabled, ...args}) => (
  <Autocomplete
    id="combo-box-demo"
    options={top100Films}
    getOptionLabel={(option) => option.title}
    disabled={disabled}
    renderInput={(params) => (<TextField {...args} {...params} label={label}/>)}
  />
);

const AutocompleteTemplate = ({ disabled, ...args }) => {
  const options = top100Films.map((option) => {
    const firstLetter = option.title[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  return (
    <Grid container spacing={2}>
      <Grid item container spacing={2}>
        <Grid item xs={6}>
          <Autocomplete
            id="combo-box-demo"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            disabled={disabled}
            renderInput={(params) => (<TextField {...args} {...params} label="Basic autocomplete"/>)}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id="combo-box-demo"
            options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.title}
            disabled={disabled}
            renderInput={(params) => (<TextField {...args} {...params} label="Grouped autocomplete"/>)}
          />
        </Grid>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="combo-box-demo"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            disabled={disabled}
            renderInput={(params) => (<TextField {...args} {...params} label="Multiple autocomplete"/>)}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export const Playground = Template.bind({});

export const Default = AutocompleteTemplate.bind({});
Default.args = { }

export const Filled = AutocompleteTemplate.bind({});
Filled.args = { variant: 'filled' }

export const Outlined = AutocompleteTemplate.bind({});
Outlined.args = { variant: 'outlined' }
