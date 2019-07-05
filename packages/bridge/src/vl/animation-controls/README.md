## Animation Controls VL Bridge

Use this in order to connect a VL animation with your as-animations-controls-widget

### Usage

There are two ways of using this:

- Creating an animation expression on the viz
- Automatically creating an animation where you can control certain parameters

Let's see how it works:

```
const viz = new carto.Viz(`
  @duration: 30
  @min: globalMin($timestamp)
  @max: globalMax($timestamp)
  filter: animation(linear($timestamp, 1900, 2017), @duration, fade(0.1, ${Number.MAX_SAFE_INTEGER}))

  strokeWidth: 0
`);
```

Now that we've the viz, we can use the `animationControls` method as follows. By default, the animation controls widget asumes the animation is assigned to the `filter` viz property:

```
const widget = document.querySelector('as-animation-controls-widget');
bridge.animationControls(widget, 'timestamp');
```

It is also possible to generate automatically a basic animation by using the Bridge. You can have an empty Viz and call the `animationControls` function directly:

```
const widget = document.querySelector('as-animation-controls-widget');
bridge.animationControls(widget, 'timestamp', {
  duration: 15,
  fade: [0.1, Number.MAX_SAFE_INTEGER]
});
```

In this case, the animation is also applied by default to the `filter` style property. However, it is possible to set it to a different property by using the `propertyName` option:

```
const viz = new carto.Viz(`
  width: animation(linear($timestamp), 20,fade(1, 1)) * ramp(linear($number, 2, 5), [5, 20])
`);

const widget = document.querySelector('as-animation-controls-widget');
bridge.animationControls(widget, 'timestamp', {
  propertyName: 'width'
});
```

The Bridge allows to get the animation from a viz variable instead of form a style property:

```
const viz = new carto.Viz(`
  @myAnimation: animation(linear($timestamp), 20,fade(1, 1)) * ramp(linear($number, 2, 5), [5, 20])
`);

const widget = document.querySelector('as-animation-controls-widget');
bridge.animationControls(widget, 'timestamp', {
  propertyName: 'width',
  variableName: 'myAnimation'
});
```

### Reference

#### VLBridge.animationControls(widget: HTMLAsAnimationControlsWidget, column: string, options: AnimationControlsOptions = {}) => AnimationControls

This method receives a AnimationControls widget, a column name and an options objects like the following:

```
AnimationControlsOptions {
  duration?: number;
  fade?: [number, number];
  variableName?: string;
  propertyName?: string;
}
```

`duration` how long should the animation be in seconds, defaults to 10
`fade` an array of two durations for fading in and out, check the VL Animation [documentation](https://carto.com/developers/carto-vl/reference/#cartoexpressionsanimation), defaults to [0.15, 0.15]
`variableName` Name for the animation variable creation / lookup, if needed.
`propertyName` Name for the style property that is animated. Will be set to `filter` by default.

#### AnimationControls.animation : VLAnimation

Returns the CARTO VL animation object, in case you need some tweaking.

```
const ts = bridge.animationControls(...);
console.log('Animation duration is', ts.animation.duration)
```