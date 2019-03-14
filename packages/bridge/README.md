# CARTO VL Airship bridge

Airship components are a great tool to build Location Intelligence dashboards, and CARTO VL an amazing tool for mapping. This library makes them work together easily.

## What does this do?

Essentially, it lets you take your existing CARTO VL visualizations and easily connect them to Airship widgets. Namely, to the following:

- Histogram widgets (numerical & categorical)
- Time Series widget
- Category widget
- Range Slider, for a global range of a numerical value

As Airship expands and adds further components, expect them to get their respective filter here as well.

Because these connections can be read-only or allow filtering, they are called **Filters**, and are all orchestrated by a `VLBridge` object.

### Histogram Filter

The histogram will get automatically populated and refresh when moving the map around.

Both numerical and categorical histograms are supported. You can use the `histogram` method with or without number of buckets, or you can use the individual functions `numericalHistogram` & `categoricalHistogram`.

### Time series Filter

The time series bridge lets you display the progress of a VL animation on a time-series-widget and binds all the events to control it (seeking, pausing).

It will also automatically do the logic to play the animation when selecting a range.

### Category Filter

Very similar to a histogram, but the data is displayed using an `as-category-widget`.

### Global Range Filter

This lets you assign a Range Slider to a numerical column, and will set its range to the global min / max of said column, allowing filtering by it.

## How can I use this?

A typical use of this library implies creating a new bridge for an existing layer:

```
const bridge = new AsBridge.VLBridge({
  carto: carto,
  map: map,
  layer: vizLayer,
  source: source
});
```

`carto` is your CARTO VL namespace object, which is required in order to create new layers.
`map` is your MapboxGL map. We internally add a new layer, so we need a place to put it.
`vizLayer` is your existing CARTO VL layer.
`source` is the source of the aforementioned layer.

And then creating all the necessary filters:

```
bridge.histogram(timestampWidget, 'timestamp', {
  buckets: 30,
  source
});

bridge.histogram(surfaceWidget, 'surface', {
  buckets: 40,
  source
});

```

And then simply bundling it all together

```
bridge.build();
```

Be sure to check out [our examples](https://github.com/CartoDB/airship/tree/master/packages/bridge/examples).

### Usage from the CDN

Just include the following tag:

```
<script src="https://libs.cartocdn.com/airship-bridge/prerelease/asbridge.js"></script>
```

And start bridging your visualizations to your widgets.
