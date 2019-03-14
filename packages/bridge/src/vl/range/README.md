## Global Range VL Bridge

Use this in order to connect a numerical column to an Airship range slider. The widget will automatically fetch the global mininum and maximum values of the column and set it on the widget.

All the event handling will be done so the widget filters the visualization. Since this is a 'global' filter, it is not affected by other filters.

### Usage

As usual, create the bridge instance with the required parameters

```
const bridge = new AsBridge.VLBridge({
  carto: carto,
  map: map,
  vizLayer: vizLayer,
  source: source
});
```

Then, you will just have to call the `globalRange` method, like the following:

```
bridge.globalRange({
  column: 'gdp',
  widget: gdpRange
});
```

The gdpRange widget will get its range set to the global range of the `gdp` column, and filter the visualization.

As usual, create any other filters if required and call the `build` method.

```
bridge.build();
```

### Reference

#### VLBridge.globalRange(options: GlobalRangeOptions) => GlobalRangeFilter

This method receives the following object as options:

```
GlobalRangeOptions {
  column: string;
  widget: HTMLAsRangeSliderElement;
}
```

`column` is a string for the visualization column to get the data from.
`widget` is your as-range-slider HTML element.

This method returns the GlobalRangeFilter instance.

### Widget side effects

When using this filter, several properties will be updated internally, so you should avoid updating them:

- `range`
- `minValue`
- `maxValue`
