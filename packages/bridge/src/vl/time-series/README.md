## Time Series VL Bridge

Use this in order to connect a VL animation with your as-time-series widget.

Internally, a histogram is created to display the bars, and also all the necessary logic to provide:

- Seeking the animation
- Play / Pause support
- Range playback

### Usage

There are two ways of using this:

- Creating an animation expression on the viz, stored on a variable
- Automatically creating an animation where you can control certain parameters

If you create the animation expression, you can call it `@animation` or if you need to, name it as you wish and specify such name on the options object of this.

```
const viz = new carto.Viz(`
  @duration: 30
  @min: globalMin($timestamp)
  @max: globalMax($timestamp)
  @customAnimation: animation(linear($timestamp, 1900, 2017), @duration, fade(0.1, ${Number.MAX_SAFE_INTEGER}))

  strokeWidth: 0
`);
```

Then use the `timeSeries` method like this:

```
bridge.timeSeries(timeWidget, 'timestamp', {
  buckets: 30,
  readOnly: false,
  variableName: 'customAnimation'
});
```

If you do not want to create it yourself, you can have an empty Viz and call the `timeSeries` function like this:

```
bridge.timeSeries(timeWidget, 'timestamp', {
  buckets: 30,
  readOnly: false,
  duration: 15,
  fade: [0.1, Number.MAX_SAFE_INTEGER]
});
```

### Reference

#### VLBridge.timeSeries(widget: HTMLAsTimeSeriesWidget, column: string, options: AnimationOptions = {}) => void

This method receives a Time Series widget, a column name and an options objects like the following:

```
AnimationOptions {
  readOnly?: boolean;
  duration?: number;
  fade?: [number, number];
  variableName?: string;
  nBuckets?: number;
  bucketRanges?: BucketRanges[];
}

BucketRanges = [number, number]
```

`readOnly` is a boolean to specify whether this widget should filter or not.
`nBuckets` is a number to specify the number of buckets the histogram should have
`bucketRanges` is an array of pairs of numbers, which lets you specify the bucket ranges by hand
`duration` how long should the animation be in seconds, defaults to 10
`fade` an array of two durations for fading in and out, check the VL Animation [documentation](https://carto.com/developers/carto-vl/reference/#cartoexpressionsanimation), defaults to [0.15, 0.15]
`variableName` Name for the animation variable creation / lookup. Will be called `animation` by default.

Internally, a numerical histogram will be created, as well as the necessary bindings to VLs animation object API

### Widget side effects

Since this filter internally creates a histogram, the same properties are affected. Moreover, the following as-time-series properties are affected:

- `animated`
- `playing`
- `progress`
