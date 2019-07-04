## Animation Controls VL Bridge

Use this in order to connect a VL animation with your as-animations-controls-widget

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

Then use the `animationControls` method like this:

```
const widget = document.querySelector('as-animation-controls-widget');
bridge.animationControls(widget, 'timestamp', {
  variableName: 'customAnimation'
});
```

If you do not want to create it yourself, you can have an empty Viz and call the `animationControls` function like this:

```
const widget = document.querySelector('as-animation-controls-widget');
bridge.animationControls(widget, 'timestamp', {
  duration: 15,
  fade: [0.1, Number.MAX_SAFE_INTEGER]
});
```

By default, the animation is applied to the `filter` style property. However, it is possible to set it to a different property by using the `propertyName` option as follows:

```
const viz = new carto.Viz(`
  @customAnimation: animation(linear($timevalue), 20,fade(1, 1)) * ramp(linear($number, 2, 5), [5, 20])
  width: @customAnimation
`);

const widget = document.querySelector('as-animation-controls-widget');
bridge.animationControls(widget, 'timestamp', {
  variableName: 'customAnimation',
  propertyName: 'width'
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
`variableName` Name for the animation variable creation / lookup. Will be called `animation` by default.
`propertyName` Name for the style property that is animated. Will be set to `filter` by default.

#### AnimationControls.animation : VLAnimation

Returns the CARTO VL animation object, in case you need some tweaking.

```
const ts = bridge.animationControls(...);
console.log('Animation duration is', ts.animation.duration)
```