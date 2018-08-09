# as-range-slider

It displays a control to select a range of two numbers from a predefined interval, dragging a slider. Selection can be determined using one or two values. When using one value, the range goes from the minimum to the selected value. When using two, the minimum value can be also configured.

### Examples

#### Simple (one value)
```html
noSource: true
---
<iframe  frameborder="0" marginwidth="10" src="/examples/components/as-range-slider/simple.html" style="width: 100%; height: 40px;">
```

```code
lang: html
showSource: false
---
<!-- Example using one value -->
<as-range-slider></as-range-slider>

<script>
    var rangeSliderWidget = document.querySelector('as-range-slider');
    rangeSliderWidget.minValue = 10;
    rangeSliderWidget.maxValue = 20;
    rangeSliderWidget.value = 12;
    rangeSliderWidget.step = 2;
</script>
```

#### Multivalue (range mode)
```html
noSource: true
---
<iframe  frameborder="0" marginwidth="10" src="/examples/components/as-range-slider/multivalue.html" style="width: 100%; height: 40px;">
```

```code
lang: html
showSource: false
---
<!-- Example using a range and handling events -->
<as-range-slider min-value="25" max-value="75"></as-range-slider>
<script>
    const rangeSliderWidget = document.querySelector('as-range-slider');
    rangeSliderWidget.range = [30, 70];
    rangeSliderWidget.step = 5;
    rangeSliderWidget.draggable = true;
    rangeSliderWidget.formatValue = (value) => (`${value}€`);
    rangeSliderWidget.addEventListener('change', (event) => console.log('Changed:', event.detail));
    rangeSliderWidget.addEventListener('changeStart', (event) => console.log('Change Start:', event.detail));
    rangeSliderWidget.addEventListener('chang
    eEnd', (event) => console.log('Change End:', event.detail);
</script>
```

#### Disabled
```html
noSource: true
---
<iframe  frameborder="0" marginwidth="10" src="/examples/components/as-range-slider/disabled.html" style="width: 100%; height: 80px;">
```

```code
lang: html
showSource: false
---
<!-- Example using disabled property -->
<as-range-slider value="5" disabled="true"></as-range-slider>
    <br/>
<button>Toggle disabled</button>
<script>
    document.querySelector('button').addEventListener('click', () => {
        const rangeSliderWidget = document.querySelector('as-range-slider');
        rangeSliderWidget.disabled = !rangeSliderWidget.disabled;
    })
</script>
````

### Props

#### value: number
Value to use as maximum in a range defined with just one number (minimum will be set to `minValue`)

#### range: number[]
Pair of numbers used to define a range.

#### minValue: number = 0
Bottom limit of the range. You cannot drag your slider below this value. By default the value is 0.

#### maxValue: number = 10
Top limit of the range. You cannot drag your slider beyond this value. By default the value is 10.

#### step: number = 1
Increment/decrement step of the slider. You can change the step setting a different number to this property. Defaults to 1.

#### disabled: boolean = false
Disables component if truthy. False by default.

####  draggable: boolean = false
If this property is set to true, and it has multiple value, you can drag the entire track. False by default

#### formatValue: (value: number) => void
Optional function to format the numbers (eg. for adding $ or € after the figure). Undefined by default (original value will be displayed, without formatting)


### Events
All events return an array with one value (simple mode) or two (range).

#### change
Returns number []
Triggered when the user is dragging a slider.

#### changeStart
Returns number[ ]
Triggered when the user starts dragging a slider.

#### changeEnd
Returns number[ ]
Triggered when the user ends dragging a slider.


### Methods
There are currently no methods, but you can change some of the previous properties and the component will react appropriately
