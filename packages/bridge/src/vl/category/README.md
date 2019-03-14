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
const category = bridge.category(categoryWidget, 'a_valid_column', {
  readyOnly: false
});
```

Create any other filters (histogram, time series) and call `build` to let the library do its work

```
bridge.build();
```

### Reference

#### VLBridge.category(widget: HTMLAsCategoryWidgetElement | string, column: string, options: CategoryOptions) => CategoryFilter

This method requires an Airship Category widget element or DOM selector, a column name and accepts the following options:

```
CategoryOptions {
  readOnly: boolean
  button: HTMLElement | string
}
```

`readOnly` is a boolean to specify whether this widget should filter or not.
`button` is an HTMLElement or a selector that will be used to trigger the filtering. If this is present, you will be able to select multiple categories and the filtering will happen when the user clicks on the element.

This method returns the CategoryFilter instance.

### Widget side effects

The following properties of the widget are updated internally, so you should avoid changing them:

- `disableInteractivity`
- `showClearButton`
- `categories`
