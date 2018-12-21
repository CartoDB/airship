# CARTO VL bindings

Airship components are a great tool to build Location Intelligence dashboards, and CARTO VL and CARTO.js are both amazing mapping tools. This library makes them work together easily.

## Usage

In order to start binding your visualization to your Airship widgets, you'll need to create the base `VL` object like this:

```
const bindings = new AsBindings.VL(
  carto,
  map,
  layer,
  source
);
```

This object will let you add all the bindings to your application. After adding some of them, you will have to indicate that you are done by calling:

```
bindings.build();
```

### Parameters

#### carto

This is your VL namespace

#### map

This is the MapboxGL map instance on your visualization

#### layer

This is the layer you want to control through Airship components. Its internal Viz will be modified by this library to make everything work. Particularly, the `filter` property will be fully controlled by this library.

#### source

This is the same source you have added to your layer.

### Histogram

In order to bind a histogram widget to a visualization, you need to call the VL#histogram method like this:

```
bindings.histogram({
  column: 'timestamp',
  buckets: 30,
  widget: timestampWidget,
});
```

The parameters are the following:

#### column: string

The column that will be used to generate a histogram.

#### buckets: number

The number of buckets / bins / bars the histogram will have.

#### widget: HistogramWidget

A reference to your Histogram Widget HTML element.

#### readOnly: boolean

Warning: This is an experimental feature

This flag lets you specify if you want your widget filtering the visualization or not. It will do it for you under the hood, making the widget react to other widgets filtering, as well as moving the map around. Keep in mind it is very resource heavy right now, so user discretion is advised.

### Time Series

A time series is essentially a histogram with animation capabilities. By passing a numeric or date type column, a histogram is generated and animation controls are handled for you. 

However, this binding has two restrictions compared to the histogram:

- Only one can be present for a Layer
- You will have to create the animation yourself and place it on a variable called `@animation`

This second restriction is meant to leave animation details up to you. Make sure no other animation has been bound and that the layer's Viz you pass contains an animation variable like this:

```
new carto.Viz(`
  @animation: animation(linear($timestamp, 1900, 2017), 30, fade(0.1, 0.2))
`);
```

Then, you can use the bindings like this:

```
bindings.timeSeries({
  column: 'timestamp',
  buckets: 30,
  widget: timeWidget
});
```

The parameters are exactly the same as the Histogram

### Usage from the CDN

Just include the following tag:

```
<!-- Minified Version -->
<script src="https://libs.cartocdn.com/airship-bindings/v1/asbindings.min.js"></script>

<!-- Non-Minified Version -->
<script src="https://libs.cartocdn.com/airship-bindings/v1/asbindings.js"></script>
```

And start binding your visualizations to your widgets.

### Usage from NPM

You will need to install the package [@carto/airship-bindings](https://www.npmjs.com/package/@carto/airship-bindings). It will contain both a bundled version, like the one you use from the CDN, and the whole source code for you to import freely.

