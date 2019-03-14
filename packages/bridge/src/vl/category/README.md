## Category Widget VL Bridge

Use this in order to connect a category widget with your VL visualization. Internally, this is a VL `viewportHistogram` for categorical data.

### Usage

As usual, create the bridge instance with the required parameters

```
const bridge = new AsBridge.VLBridge({
  carto: carto,
  map: map,
  layer: vizLayer,
  source: source
});
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
