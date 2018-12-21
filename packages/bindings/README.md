# CARTO VL Airship bindings

Airship components are a great tool to build Location Intelligence dashboards, and CARTO VL and CARTO.js are both amazing mapping tools. This library makes them work together easily.

## What does this do?

Right now, there's support for CARTO VL plus the following widgets:

- Histogram widget
- Time series widget

### Histogram

The histogram will get automatically populated and refresh when moving the map around.

The histogram supports an experimental non read-only mode as well, which will filter the visualization and the rest of the widgets.

### Time series

The time series bindings lets you display the progress of a VL animation on a time-series-widget and binds all the events to control it.

It will also automatically do the logic to play the animation when selecting a range.

## How can I use this?

A typical use of this library implies creating a new binding for an existing layer:

```
const bindings = new AsBindings.VL(
  carto,
  map,
  vizLayer,
  source
);
```

And then creating all the bindings necessary:

```
bindings.histogram({
  column: 'timestamp',
  buckets: 30,
  source,
  widget: timestampWidget,
});

bindings.histogram({
  column: 'surface',
  buckets: 40,
  source,
  widget: surfaceWidget,
});

```

And then simply bundling it all together

```
bindings.build();
```

### Usage from the CDN

Just include the following tag:

```
<script src="https://libs.cartocdn.com/airship-bindings/v1/asbindings.js"></script>
```

And start binding your visualizations to your widgets.
