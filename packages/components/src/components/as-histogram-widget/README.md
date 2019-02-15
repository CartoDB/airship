
Histogram widget displays data that is organized in discrete intervals (or _buckets_) as a bar chart. It features selecting a range, as well as customizing its colours.

```html
noSource: true
---
<iframe src="/examples/components/as-histogram-widget/simple.html" style="width: 100%; height: 300px;">
```

[See example](/developers/airship/examples/#example-as-histogram-simple)


```code
lang: html
showSource: false
---
<as-histogram-widget
  heading="Title"
  description="Description"
  show-header
  show-clear>
</as-histogram-widget>

<script>
  var histogramWidget = document.querySelector('as-histogram-widget');
  histogramWidget.data = [
    { start: 0, end: 10, value: 5 },
    { start: 10, end: 20, value: 10 },
    { start: 20, end: 30, value: 15 },
    { start: 30, end: 40, value: 20 },
    { start: 40, end: 50, value: 30 },
  ];
</script>
```

### CSS Variables

```
as-histogram-widget {
  --as--histogram-widget--background-color
  --as--histogram-widget--figure--stroke-color
  --as--histogram-widget--figure--text-color
  --as--histogram-widget--label-color
  --as--histogram-widget--label-font
}
```

### Props

#### **data**: HistogramData[] = []
Histogram accepts two kinds of data: categorical and continuous. Both must have a `value` property, which represents the value on the y-axis.

Continuous data must also have start / end properties, which should be continuous:

```code
lang: javascript
---
histogramWidget.data = [
  { start: 50, end: 60, value: 5 },
  { start: 60, end: 70, value: 30 },
  { start: 70, end: 80, value: 45 },
  { start: 80, end: 90, value: 60 },
];
```

Categorical widgets must have a category for each element in the data.

```code
lang: javascript
---
histogramWidget.data = [
  { category: 'five', value: 5 },
  { category: 'thirty', value: 30 },
  { category: 'forty-five', value: 45 },
  { category: 'sixty', value: 60 },
];
```

If you provide a start / end as well as a category for each element, it will be treated as a categorical histogram, but will keep the start / end ranges as well.

Optionally, you can provide a color for each data entry.

> Color can´t be a named color, use `hex` or `rgb` form instead!


```code
lang: javascript
---
histogramWidget.data = [
  { start: 50, end: 60, value: 5, color: '#FF0000' },
  { start: 60, end: 70, value: 30 },
  { start: 70, end: 80, value: 45 },
  { start: 80, end: 90, value: 60 },
];
```

#### **backgroundData**: HistogramData[] = []

This property must be an array of Histogram data compatible with the current data. This means that:

- They are equal in length
- For continuous histograms, all start / end ranges are the same
- For categorical histograms, all categories are the same

This data is rendered behind the actual data, filled with the `unselectedColor` prop. This is useful to keep some context if you have "global" visualization data.

Since this data is considered 'background', is assumed that `data` will be a subset of this. This means that the scale is calculated with this data (if present) instead of `data`.

#### **color**: string = '#47DB99'
Overrides default bar color. Default value is `#47DB99`

```code
lang: html
---
<as-histogram-widget color="#FABADA"></as-histogram-widget>
```
```code
lang: javascript
---
histogramWidget.color = `#FABADA`;
```

#### **unselectedColor**: string = '#E2E6E3'
Overrides default bar color for bars outside the selection.

```code
lang: html
---
<as-histogram-widget unselected-color="#120918"></as-histogram-widget>
```
```code
lang: javascript
---
histogramWidget.color = `#120918`;
```

#### **description**: string
Description text of the widget

```code
lang: html
---
<as-histogram-widget description="Description"></as-histogram-widget>
```
```code
lang: javascript
---
histogramWidget.description = 'Description';
```

#### **disableInteractivity**: boolean = false
Disables selection brushes and events for the widget

```code
lang: html
---
<as-histogram-widget disable-interactivity></as-histogram-widget>
```
```code
lang: javascript
---
histogramWidget.disableInteractivity = true;
```

#### **heading**: string
Heading text of the widget

```code
lang: html
---
<as-histogram-widget heading="Heading"></as-histogram-widget>
```
```code
lang: javascript
---
histogramWidget.heading = 'Business Volume';
```

#### **showClear**: boolean = false
If truthy, it'll show a button to clear the histogram selection. Default value is `false`.

```code
lang: html
---
<as-histogram-widget show-clear></as-histogram-widget>
```

```code
lang: javascript
---
histogram.showClear = true;
```

#### **clearText**: string = 'Clear selection'
String to disply on the button that clears the selection.

```code
lang: html
---
<as-histogram-widget clear-text="Lopetegui"></as-histogram-widget>
```

```code
lang: javascript
---
histogram.clear-text = "Lopetegui";
```

#### **showHeader**: boolean = true
If truthy, it'll render the heading and the component's description. Default value is `true`.

```code
lang: html
---
<as-histogram-widget show-header="false"></as-histogram-widget>
```

```code
lang: javascript
---
histogramWidget.showHeader = false;
```

#### **error**: string = ""
Use this widget to put the widget in "error mode".
When error mode is active. The header will display the given text, and the body will be display the errorDescription instead any data.

```code
lang: html
---
<as-histogram-widget error="Can't load any data"></as-histogram-widget>
```

```code
lang: javascript
---
histogramWidget.error = 'Can\'t load any data'
```

#### **errorDescription**: string = ""
String shown in the body of the widget when error mode is on.

```code
lang: html
---
<as-histogram-widget error="Can't load any data" error-description="There is no internet connection."></as-histogram-widget>
```

```code
lang: javascript
---
histogramWidget.errorDescription = 'There is no internet connection.'
```

#### **isLoading**: boolean = true
Use this attribute to put the widget in "loading mode". When loading mode is active, a spinner will be shown and the data will be hidden.

```code
lang: html
---
<as-histogram-widget is-loading="true"></as-histogram-widget>
```

```code
lang: javascript
---
histogramWidget.isLoading = true;
```


#### **tooltipFormatter**: function
Function that receives one value of the **data** property and returns a string or array of strings. The value is the one for the bar the user is hovering.

By default, it returns the _value_ field formatted sensibly.

The default implementation is the method _defaultFormatter_, so you can use it to keep the original behaviour and add something extra.

If you return an array of strings, each will be rendered on a different line.

```code
lang: javascript
---
histogramWidget.tooltipFormatter = function (data) {
  return histogramWidget.defaultFormatter(data) + ' schmeckles';
};
```

#### **selectedFormatter**: function
Function that receives the selection and must return a string. It is used to display a message on the footer to indicate what range has been selected.

This is useful for localization purposes.

```code
lang: javascript
---
histogramWidget.selectedFormatter = function (selection) {
  return `Selected from %{selection[0]} to ${selection[1]}.;
};
```

#### **range**: [number, number]

This prop lets you specify the range of the data, so it will not be calculated each time the data changes. This is very useful to better appreciate data variations when filtering.

```code
lang: javascript
---
histogramWidget.data = [
  { start: 50, end: 60, value: 5 },
  { start: 60, end: 70, value: 30 },
  { start: 70, end: 80, value: 45 },
  { start: 80, end: 90, value: 60 },
];

histogramWidget.range = [0, 100]
```

#### **disableAnimation**: boolean

This prop lets you disable bars animations

```code
lang: javascript
---
histogramWidget.disableAnimation = true
```

```code
lang: html
---
<as-histogram-widget disable-animation></as-histogram-widget>
```

#### **xAxisOptions**: object

This prop lets you configure several features of the X axis. It is an object that proxies several features of [d3-axis](https://github.com/d3/d3-axis/tree/a329626cdf632a1af61b7124873b70c04c42b6a8):

- format: A function that takes a numeric value and returns a string
- padding: A number, to control the space between number and axis
- values: An array of numbers, to specify which values to display on the axis
- ticks: A number, to specify how many values to display on the axis

```hint|directive
Please note that `values` has precedence over `ticks`, so if you set an array of values, the number of ticks is ignored.
```

```code
lang: javascript
---
histogramWidget.xAxisOptions = {
  values: [20, 25],
  ticks: 2,
  padding: 0,
  format: (value) => `${value} y.o.`
};
```

#### **yAxisOptions**: object

Same as `xAxisOptions`, but for the Y axis

### Styles
There are some CSS Variables that you can override to change visual styles.

#### **\--histogram-widget\--description-color**
Default: $color-type-02 (`#1785FB`)

```code
lang: javascript
---
document.body.style.setProperty('--histogram-widget--description-color', '#1785FB')
```

#### **\--histogram-widget\--background-color**
Default: $color-ui-01 (`#FFF`)

```code
lang: javascript
---
document.body.style.setProperty('--histogram-widget--background-color', '#F5F5F5')
```

### Events

#### **selectionChanged**
Fired when the user selects a range, updates it or clears it. See _getSelection_, _setSelection_ and _clearSelection_ methods for programmatic control.

The data on the event for this widget changes slightly depending on the type of data provided. In order to detect which type it is, a _type_ member is provided, which will have the value `continuous` or `categorical`.

For continuous data histograms, the properties have the following content:

- selection: An array of numbers of length 2, with the start of the first bucket and the end of the last one.
- payload: An array with the corresponding buckets of the _selection_ field.

For categorical data histograms:

- selection: A string array of undetermined length (1 - n), corresponding to the selected categories.
- payload: A bucket array of undetermined length (1 - n), corresponding to the categories on _selection_. This is useful to retrieve the start / end data if originally provided.

```code
lang: javascript
---
const histogramWidget = document.querySelector('as-histogram-widget');
histogramWidget.addEventListener('selectionChanged', event => {
  console.log('Selection is now: ', event.detail.selection)
});
```

#### **selectionInput**
Same as `selectionChanged`, but fires with every selection change (i.e: dragging), not only when the selection has finished.

#### **drawParametersChanged**
This event is triggered whenever the widget renders, and it emits an object containing parameters useful to extend the histogram:

- container: the DOM element that contains the Histogram
- width: the current width of the histogram
- handleWidth: the width of the selection handles
- height: the current height of the histogram
- padding: the padding around the histogram
- xScale: d3 scale between (0, width) to (0, nBins)
- binsScale: d3 scale between (0, nBins) to the actual data

For instance, this is used internally by the as-time-series-widget to draw the progress above the histogram.

### Methods

#### **getSelection**
Get current selection, or null.
`Returns: Promise<number[] | string[] | null>`

```code
lang: javascript
---
// Async/Await approach
const histogramWidget = document.querySelector('as-histogram-widget');
console.log(await histogramWidget.getSelection(), 'is selected');

// Promises approach
const histogramWidget = document.querySelector('as-histogram-widget');
histogramWidget.getSelection()
               .then(selectionRange => console.log(selectionRange, 'is selected'));
```

```hint|directive
Please note that you always need to wrap your `await` code in an `async` function. If you use it outside of an async function, it will raise a `SyntaxError`. Learn more about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).
```

#### **setSelection**
Set a new selection. The component will round the values to the nearest intervals. Calling this with `null` has the same effect as _clearSelection_

Note that this method is only supported for continuous values (providing a numeric range).

```code
lang: javascript
---
// Async/Await approach
const histogramWidget = document.querySelector('as-histogram-widget');
await histogramWidget.setSelection([0, 100]);

// Promises approach
const histogramWidget = document.querySelector('as-histogram-widget');
histogramWidget.setSelection([0, 100])
               .then(() => {
                 // Whatever you want to do next
               });
```

```hint|directive
Please note that you always need to wrap your `await` code in an `async` function. If you use it outside of an async function, it will raise a `SyntaxError`. Learn more about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).
```

#### **clearSelection**
Clear current selection

```code
lang: javascript
---
// Async/Await approach
const histogramWidget = document.querySelector('as-histogram-widget');
await histogramWidget.clearSelection();

// Promises approach
const histogramWidget = document.querySelector('as-histogram-widget');
histogramWidget.clearSelection()
               .then(() => {
                 // Whatever you want to do next
               });
```

```hint|directive
Please note that you always need to wrap your `await` code in an `async` function. If you use it outside of an async function, it will raise a `SyntaxError`. Learn more about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).
```

### Examples

#### Events & tooltip formatter

A simple example showcasing how to handle selection events, and a tooltip formaterr

```html
noSource: true
---
<iframe src="/examples/components/as-histogram-widget/events.html" style="width: 100%; height: 300px;">
```

[See example](/developers/airship/examples/#example-as-histogram-events)

```code
lang: html
showSource: false
---
<as-histogram-widget
  show-header="false"
  show-clear>
</as-histogram-widget>
<p id="selection">Nothing selected</p>
<script>
  var histogramWidget = document.querySelector('as-histogram-widget');
  histogramWidget.data = [
    { start: 0, end: 10, value: 5 },
    { start: 10, end: 20, value: 10 },
    { start: 20, end: 30, value: 15 },
    { start: 30, end: 40, value: 20 },
    { start: 40, end: 50, value: 30 },
  ];

  histogramWidget.tooltipFormatter = function (data) {
    return histogramWidget.defaultFormatter(data) + ' kg';
  }

  var selectionEl = document.querySelector('#selection');
  histogramWidget.addEventListener('selectionChanged', function (e) {
    if (e.detail === null) {
      selectionEl.innerText = 'Nothing selected';
    } else {
      selectionEl.innerText = 'Selected from ' + e.detail[0] + ' to ' + e.detail[1];
    }
  });
</script>
```

#### Histogram with disabled interactivity

```html
noSource: true
---
<iframe src="/examples/components/as-histogram-widget/interaction-disabled.html" style="width: 100%; height: 300px;">
```

[See example](/developers/airship/examples/#example-as-histogram-interaction-disabled)

```code
lang: html
showSource: false
---
<as-histogram-widget
  heading="Title"
  description="Description"
  show-header
  show-clear>
</as-histogram-widget>

<script>
  var histogramWidget = document.querySelector('as-histogram-widget');
  histogramWidget.data = [
    { start: 0, end: 10, value: 5 },
    { start: 10, end: 20, value: 10 },
    { start: 20, end: 30, value: 15 },
    { start: 30, end: 40, value: 20 },
    { start: 40, end: 50, value: 30 },
  ];
</script>
```


#### **responsive**: boolean=true
 Use this attribute to decide if the widget should be rerendered on window resize. 
 Defaults to `true`.

```code
lang: html
---
<as-histogram-widget responsive="false"></as-histogram-widget>
```
```code
lang: javascript
---
histogram.responsive = false;
```
