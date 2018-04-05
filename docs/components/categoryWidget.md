The category widget shows the categories returned by [CARTO.js](https://carto.com/documentation/cartojs/) with the amount and the percentage based on the maximum value

```react
state: { selected: [] }
---
<Widget>
  <Widget.Title>Populated Places</Widget.Title>
  <Widget.Description>All selected</Widget.Description>
  <CategoryWidget data={data} />
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
    data={data}
    onCategoryClick={(selected) => setState({ selected })}
    selected={state.selected}
  />
  {state.selected.length > 0
    ? <Button small borderless onClick={() => setState({ selected: [] })}>Clear all</Button>
    : null
  }
</Widget>
```

### Props

#### **data** (object)

Data returned by [CARTO.js](https://carto.com/documentation/cartojs/docs/#cartodataviewcategorydata).

#### **onCategoryClick** (function)

Returns an array with the selected categories.

#### **selected** (array)

Allows pass the selected categories to the widget, useful when we want to set an initial state, or clear the selected categories.
