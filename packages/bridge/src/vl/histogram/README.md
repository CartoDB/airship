## Histogram Widget VL Bridge

Use this in order to connect a Histogram widget with your VL visualization.

There's two histogram flavors, depending on the data you plan on representing:
 - Numerical histograms
 - Categorical histograms

The former uses a VL `viewportHistogram` in which the buckets are specified. The values should be numerical.
The latter uses a VL `viewportHistogram` but does not specify the buckets. The values are tipically strings.

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

There's a generic `histogram` method, that will create either of the two depending on which arguments you provide.

If you provide either the number of buckets, or the bucket descriptors, a numerical histogram will be created. If not,
a categorical one will.

This will create a numerical one
```
const scaleFilter = bridge.histogram(scaleHistogram, 'scalerank', {
  bucketRanges: [[2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]]
});
```

So will this one:
```
const scaleFilter = bridge.histogram(scaleHistogram, 'scalerank', {
  nBuckets: 7
});
```

And this one will create a categorical one:
```
const locationFilter = bridge.histogram(locationHistogram, 'location');
```

As usual, create any other filters if required and call the `build` method.

```
bridge.build();
```

### Reference

#### VLBridge.categoricalHistogram(widget: HTMLASHistogramWidget | string, column: string, options: CategoricalHistogramOptions = {}) => CategoricalHistogramFilter

This method requires a widget or selector, a column, and the following options:

```
CategoricalHistogramOptions {
  readOnly?: boolean;
}
```

`readOnly` is a boolean to specify whether this widget should filter or not.

This method returns the CategoricalHistogram instance.

The `column` can be a CARTO VL expression instead of a column. This will be used as the first argument of the histogram that feeds its data, so refer to the CARTO VL documentation to see which expressions are compatible.

#### VLBridge.numericalHistogram(widget: HTMLASHistogramWidget | string, column: string, options: NumericalHistogramOptions = {}) => NumericalHistogramFilter

This method requires a widget or selector, a column, and can have the following options:

```
NumericalHistogramOptions {
  readOnly?: boolean;
  nBuckets?: number;
  bucketRanges?: BucketRanges[];
  totals?: boolean;
}

BucketRanges = [number, number]
```

`readOnly` is a boolean to specify whether this widget should filter or not.
`nBuckets` is a number to specify the number of buckets the histogram should have
`bucketRanges` is an array of pairs of numbers, which lets you specify the bucket ranges by hand
`totals` will use a VL globalHistogram expression to display the totals as background bars on the widget

**It is highly recommended** that you use bucketRanges when you specify `readOnly: false`, because of how the filtering works, or `totals`, which will internally set `bucketRanges` to the ones generate via the VL globalHistogram

If both `nBuckets` and `bucketRanges` are provided, `nBuckets` will be ignored, and the number of buckets will be the length of `bucketRanges`

This method returns the NumericalHistogram instance.

#### VLBridge.histogram

This is a generic method that accepts the same arguments as `numericalHistogram` and `categoricalHistogram` but will automatically determine which type of histogram you are using. It will do so by checking whether buckets or bucketRanges are present in the options.

### Widget side effects

The following properties of the histogram will be modified internally, so modifying them should be avoided:

- `backgroundData`
- `data`
- `disableInteractivity`
- `showClear`
