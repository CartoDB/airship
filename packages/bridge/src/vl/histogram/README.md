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
const bridge = new AsBridge.VLBridge(
  carto,
  map,
  layer,
  source
);
```

There's a generic `histogram` method, that will create either of the two depending on which arguments you provide.

If you provide either the number of buckets, or the bucket descriptors, a numerical histogram will be created. If not,
a categorical one will.

This will create a numerical one
```
const scaleFilter = bridge.histogram({
  column: 'scalerank',
  bucketRanges: [[2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9]],
  widget: scaleHistogram
});
```

So will this one:
```
const scaleFilter = bridge.histogram({
  column: 'scalerank',
  nBuckets: 7,
  widget: scaleHistogram
});
```

And this one will create a categorical one:
```
const locationFilter = bridge.histogram({
  column: 'location',
  widget: scaleHistogram
});
```

As usual, create any other filters if required and call the `build` method.

```
bridge.build();
```

### Reference

#### VLBridge.categoricalHistogram(options: CategoricalHistogramOptions) => CategoricalHistogramFilter

This method receives the following object as options:

```
CategoricalHistogramOptions {
  column: string;
  readOnly: boolean;
  widget: HTMLAsHistogramWidgetElement;
}
```

`column` is a string for the visualization column to get the data from.
`readOnly` is a boolean to specify whether this widget should filter or not.
`widget` is your as-histogram-widget HTML element.

This method returns the CategoricalHistogram instance.

#### VLBridge.numericalHistogram(options: NumericalHistogramOptions) => NumericalHistogramFilter

This method receives the following object as options:

```
NumericalHistogramOptions {
  column: string;
  readOnly: boolean;
  widget: HTMLAsHistogramWidgetElement;
  nBuckets: number;
  bucketRanges?: BucketRanges[];
  totals: boolean;
}

BucketRanges = [number, number]
```

`column` is a string for the visualization column to get the data from.
`readOnly` is a boolean to specify whether this widget should filter or not.
`widget` is your as-histogram-widget HTML element.
`nBuckets` is a number to specify the number of buckets the histogram should have
`bucketRanges` is an array of pairs of numbers, which lets you specify the bucket ranges by hand
`totals` will use a VL GlobalHistogram expression to display the totals as background bars on the widget

**It is highly recommended** that you use bucketRanges when you specify `readOnly: false`, because of how the filtering works.

If both `nBuckets` and `bucketRanges` are provided, `nBuckets` will be ignored, and the number of buckets will be the length of `bucketRanges`

This method returns the NumericalHistogram instance.
