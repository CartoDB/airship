The time series widget displays a histogram widget with the ability of display dates on the x-axis, as well as controlling and displaying animations.

```html
noSource: true
---
<iframe src="/examples/components/as-time-series-widget/simple.html" style="width: 100%; height: 300px;">
```

[See example](/developers/airship/examples/#example-as-time-series-simple)

### CSS Variables

```
as-time-series-widget {
  --as--time-series--line-color
}
```

### Props

All the histogram properties are there, but also a few more:

#### **animated**: boolean = false

Enabling this flag causes the progress indicator and play / pause button to be rendered.

#### **playing**: boolean = false

Whether the animation is playing or not. Play / Pause button icon depends on this.

#### **progress**: number = false

How much the animation has progressed. Must be a number between 0 and 100.

#### **timeFormat**: string = 'auto'

A string represeting a format [compatible with d3-time-format](https://github.com/d3/d3-time-format#locale_format). It will be used to format the X-Axis of the histogram. If set to 'auto' it will set a default format depending on the input type (date or number)

#### **timeFormatLocale**: Object

A Javascript object that localizes some of the format. Again, must be [compatible with d3-time-format](https://github.com/d3/d3-time-format#locales)


### Events

All the Events from the histogram are forwarded (selectionChanged, selectionInput), plus the following:

#### **seek**

The use has clicked at some point of the histogram. The value is a value between 0 and 100

```code
lang: javascript
---
const timeSeries = document.querySelector('as-time-series-widget');
timeSeries.addEventListener('seek', event => {
  console.log('Seek animation to: ', event.detail)
});
```

#### **play**

This is triggered when the user clicks on the play button.

```code
lang: javascript
---
const timeSeries = document.querySelector('as-time-series-widget');
timeSeries.addEventListener('play', event => {
  // Start playing the animation
});
```

#### **pause**

This is triggered when the user clicks on the pause button.

```code
lang: javascript
---
const timeSeries = document.querySelector('as-time-series-widget');
timeSeries.addEventListener('pause', event => {
  // Pause the animation
});
```
