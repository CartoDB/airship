## Time Series VL Bridge

Use this in order to connect a VL animation with your as-time-series widget.

Internally, a histogram is created to display the bars, and also all the necessary logic to provide:

- Seeking the animation
- Play / Pause support
- Range playback

### Usage

There is one caveat for this case. In order to have more freedom on the animation itself, we do not create it internally. However, this means that we expect the animation on a particular variable. 

In order for this filter to work, please define your animation as a variable called `@animation`:

```
const viz = new carto.Viz(`
  @duration: 30
  @min: globalMin($timestamp)
  @max: globalMax($timestamp)
  @animation: animation(linear($timestamp, 1900, 2017), @duration, fade(0.1, ${Number.MAX_SAFE_INTEGER}))

  strokeWidth: 0
`);
```

If your viz meets the requirements, you might create the bridge instance as usual with the required parameters.

```
const bridge = new AsBridge.VLBridge({
  carto: carto,
  map: map,
  layer: vizLayer,
  source: source
});
```

Use the `timeSeries` method like this:

```
bridge.timeSeries(timeWidget, 'timestamp', {
  buckets: 30,
  readOnly: false
});
```

Finally, create any other filters if required and call the `build` method.

```
bridge.build();
```

### Reference

#### VLBridge.timeSeries(widget: HTMLAsTimeSeriesWidget, column: string, options: NumericalHistogramOptions = {}) => void

This method receives the exact same arguments as VLBridge.numericalHistogram

```
NumericalHistogramOptions {
  readOnly: boolean;
  nBuckets: number;
  bucketRanges?: BucketRanges[];
}

BucketRanges = [number, number]
```

`readOnly` is a boolean to specify whether this widget should filter or not.
`nBuckets` is a number to specify the number of buckets the histogram should have
`bucketRanges` is an array of pairs of numbers, which lets you specify the bucket ranges by hand

Internally, a numerical histogram will be created, as well as the necessary bindings to VLs animation object API

### Widget side effects

Since this filter internally creates a histogram, the same properties are affected. Moreover, the following as-time-series properties are affected:

- `animated`
- `playing`
- `progress`
