## Category Widget VL Bridge

Use this in order to connect a category widget with your VL visualization. Internally, this is a VL `viewportHistogram` for categorical data.

### Usage

As usual, create the bridge instance with the required parameters

```
const bridge = new AsBridge.VLBridge(
  carto,
  map,
  layer,
  source
);
```

Use the `category` method to connect your category widget.

```
const category = bridge.category({
  column: 'a_valid_column',
  widget: categoryWidget
});
```

Create any other filters (histogram, time series) and call `build` to let the library do its work

```
bridge.build();
```

### Reference

#### VLBridge.category(options: CategoryOptions) => CategoryFilter

This method receives the following object as options:

```
CategoryOptions {
  column: string
  readOnly: boolean
  widget: HTMLAsCategoryWidgetElement
}
```

`column` is a string for the visualization column to get the data from.
`readOnly` is a boolean to specify whether this widget should filter or not.
`widget` is your as-category-widget HTML element.

This method returns the CategoryFilter instance.

#### CategoryFilter.enableColorMapping() => void

If your visualization is styling the `color` using a ramp, like this for instance:

```
const viz = new carto.Viz(`
  color: ramp($location, vivid)
`);
```

You can use this method so that the widget will get its color from the Viz object automatically.

#### CategoryFilter.setLegendData(LegendData) => void

This method lets you specify a color mapping object.

```
LegendData {
  data: LegendEntry[]
}

LegendEntry {
  key: string | number
  value: Color
}
```

LegendData is an object with the format of [carto.expressions.ramp.getLegendData](https://carto.com/developers/carto-vl/reference/#expressionsrampgetlegenddata).

An example of this would be:

```
categoryFilter.setLegendData({
  data: [{
    key: 'category_1',
    value: '#fabada'
  },
  {
    key: 'category_2',
    value: '#febe00'
  }]
});
```

Categories with values 'category_1' will be displayed with that color, and so on.

Internally, this is used by the `enableColorMapping` method.
