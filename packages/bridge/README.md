# CARTO VL Airship bridge

Airship components are a great tool to build Location Intelligence dashboards, and CARTO VL and CARTO.js are both amazing mapping tools. This library makes them work together easily.

## What does this do?

Right now, there's support for CARTO VL plus the following widgets:

- Histogram widget
- Time series widget
- Category widget

### Histogram

The histogram will get automatically populated and refresh when moving the map around.

Both numerical and categorical histograms are supported. You can use the `histogram` method with or without number of buckets, or you can use the individual functions `numericalHistogram` & `categoricalHistogram`.

### Time series

The time series bridge lets you display the progress of a VL animation on a time-series-widget and binds all the events to control it (seeking, pausing).

It will also automatically do the logic to play the animation when selecting a range.

### Category

Very similar to a histogram, but the data is displayed using an `as-category-widget`.

## How can I use this?

A typical use of this library implies creating a new binding for an existing layer:

```
const bridge = new AsBridge.VLBridge(
  carto,
  map,
  vizLayer,
  source
);
```

And then creating all the necessary filters:

```
bridge.histogram({
  column: 'timestamp',
  buckets: 30,
  source,
  widget: timestampWidget,
});

bridge.histogram({
  column: 'surface',
  buckets: 40,
  source,
  widget: surfaceWidget,
});

```

And then simply bundling it all together

```
bridge.build();
```

There are [several examples](https://github.com/CartoDB/airship/tree/master/packages/bridge/examples) under the `/examples/` folder of the package.

### Usage from the CDN

Just include the following tag:

```
<script src="https://libs.cartocdn.com/airship-bridge/prerelease/asbridge.js"></script>
```

And start binding your visualizations to your widgets.
