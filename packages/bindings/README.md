# Airship bindings

The purpose of this library is to simplify using airship components with CARTO's map-making libraries.

## What does this do?

Right now there's support for Carto VL and:

- Histogram widget
- Time series widget

### Histogram

The histogram will get automatically populated and refresh when moving the map around.

The histogram supports a non read-only mode as well, which will filter the visualization and the rest of the widgets.

This is sort of experimental right now and should not be used with visualizations that have lots of features, because it's very resource-heavy.

### Time series

The time series bindings lets you display the progress of a VL animation on a time-series-widget and binds all the events to control it from the widget. 

It will also automatically do the logic to play the animation when selecting a range.

## How can I use this?

A typical use of this library implies creating a new binding for an existing layer:

```javascript
const bindings = new AsBindings.VL(
  carto,
  map,
  vizLayer,
  source
);
```

And then creating all the bindings necessary:

```javascript
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

```html
<script src="https://libs.cartocdn.com/airship-bindings/v1.0.0/asbindings.js"></script>
```

And start binding your visualizations to your widgets.
