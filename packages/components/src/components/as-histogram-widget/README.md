
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

### Props

#### **data**: HistogramData[] = []
Array of histogram data, each one of which should include a `value`, `start` and `end` and an optional `color`.
 
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
#### **color**: string = '#1785FB'
Overrides default bar color. Default value is `#1785FB`

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

#### **selectedColor**: string = '#47DB99'
Overrides default bar color for bars that are currently selected. It's also the color for the selection elements.

```code
lang: html
---
<as-histogram-widget selectedColor="#120918"></as-histogram-widget>
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
Function that receives one value of the **data** property and returns a string. The value is the one for the bar the user is hovering.

By default, it returns the _value_ field formatted sensibly.

The default implementation is the method _defaultFormatter_, so you can use it to keep the original behaviour and add something extra.

```code
lang: javascript
---
histogramWidget.tooltipFormatter = function (data) {
  return histogramWidget.defaultFormatter(data) + ' schmeckles';
};
```

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

```code
lang: javascript
---
const histogramWidget = document.querySelector('as-histogram-widget');
histogramWidget.addEventListener('selectionChanged', event => {
  console.log('Selection is now: ', event.detail)
});
```

### Methods

#### **getSelection**
Get current selection, or null.
`Returns: Promise<number[] | null>`

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
