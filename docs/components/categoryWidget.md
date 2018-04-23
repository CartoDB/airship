The category widget shows the categories returned by [CARTO.js](https://carto.com/documentation/cartojs/) with the amount and the percentage based on the maximum value

```react
<Widget>
  <Widget.Title>Populated Places</Widget.Title>
  <Widget.Description>All selected</Widget.Description>
  <CategoryWidget categories={data.categories} max={data.max} />
</Widget>
```

In this example we use the `onCategoryClick` prop to update our own state and use it to show the number of selected categories, we also show a button to clear the selected categories

```react
state: { selected: [] }
---
<Widget>
  <Widget.Title>Populated Places</Widget.Title>
  <Widget.Description>
    {`${state.selected.length || 'All'} selected`}
  </Widget.Description>
  <CategoryWidget
    categories={data.categories}
    max={data.max}
    onCategoryClick={(selected) => setState({ selected })}
    selected={state.selected}
  />
  {state.selected.length > 0
    ? <Button small borderless onClick={() => setState({ selected: [] })}>Clear all</Button>
    : null
  }
</Widget>
```

You can override the color of the progress bar:

```react
<Widget>
  <Widget.Title>Populated Places</Widget.Title>
  <Widget.Description>All selected</Widget.Description>
  <CategoryWidget categories={data.categories} max={data.max} color="#3AB5F0" />
</Widget>
```

### Props

#### **categories** (array required)
Array of categories, each category should include a `name` and a `value`. For example:

```
[
  { name: 'A New Hope', value: 359029623 },
  { name: 'The Empire Strikes Back', value: 236513856 },
  { name: 'Return of the Jedi', value: 204338075 },
]
```

#### **max** (number required)
Maximum value, used to calculate the `%` in the progress bar.

#### **color** (string)
Overrides the color of the progress bar.

#### **onCategoryClick** (function)
Returns an array with the selected categories.

#### **selected** (array)
Allows pass the selected categories to the widget, useful when we want to set an initial state, or clear the selected categories.
