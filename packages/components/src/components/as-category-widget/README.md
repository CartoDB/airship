Category widget displays the categories passed to the component as a list with a bar representing the percentage of each category in relation to the maximum category value.

```html
noSource: true
---
<iframe src="/examples/components/as-category-widget/simple.html" style="width: 100%; height: 354px;">
```

[See example code](/developers/airship/examples/#example-category-widget)

```code
lang: html
showSource: false
---
<!-- Example with all default values and showing clear button -->
<as-category-widget
  class="as-p--16"
  heading="Business Volume"
  description="Description"
  default-bar-color="#47DB99"></as-category-widget>

<script>
  const categoryWidget = document.querySelector('as-category-widget');
  categoryWidget.showHeader = true;
  categoryWidget.showClearButton = true;
  categoryWidget.useTotalPercentage = false;
  categoryWidget.visibleCategories = Infinity;
  categoryWidget.categories = [
    { name: 'Bars & Restaurants', value: 1000, color: '#FABADA' },
    { name: 'Fashion', value: 900 },
    { name: 'Grocery', value: 800 },
    { name: 'Health', value: 400 },
    { name: 'Shopping mall', value: 250 },
    { name: 'Transportation', value: 1000 },
    { name: 'Leisure', value: 760 }
  ];
</script>
```

### Props

#### **categories**: Category[] = []
Array of categories, each category should include a `name` and a `value`. You can also override the bar color for each category with `color`.

For example:

```code
lang: javascript
---
categoryWidget.categories = [
  { name: 'A New Hope', value: 359029623, color: '#FABADA' },
  { name: 'The Empire Strikes Back', value: 236513856 },
  { name: 'Return of the Jedi', value: 204338075 },
];
```
#### **defaultBarColor**: string = '#47DB99'
Overrides default color to draw the bars. Default value is `#47DB99`.

```code
lang: html
---
<as-category-widget defaultBarColor="#47DB99"></as-category-widget>
```
```code
lang: javascript
---
categoryWidget.defaultBarColor = `#47DB99`;
```

#### **description**: string
Description text of the widget

```code
lang: html
---
<as-category-widget description="Description"></as-category-widget>
```
```code
lang: javascript
---
categoryWidget.description = 'Description';
```

#### **disableInteractivity**: boolean = false
Disable category selection in Widget

```code
lang: html
---
<as-category-widget disable-interactivity></as-category-widget>
```
```code
lang: javascript
---
categoryWidget.disableInteractivity = true;
```

#### **valueFormatter**: function
Function that receives one of the **categories**' property value and returns a string that will be used for category value rendering.

By default, it returns the _value_ field formatted sensibly.

The default implementation is the method _defaultFormatter_, so you can use it to keep the original behaviour and add something extra.

```code
lang: javascript
---
categoryWidget.valueFormatter = value => `${categoryWidget.defaultFormatter(value)}€`;
```

#### **heading**: string
Heading text of the widget

```code
lang: html
---
<as-category-widget heading="Heading"></as-category-widget>
```
```code
lang: javascript
---
categoryWidget.heading = 'Business Volume';
```

#### **showClearButton**: boolean = false
If truthy, it'll show a button to clear selected categories when there are any. Default value is `false`.

```code
lang: html
---
<as-category-widget show-clear-button="true"></as-category-widget>
```

```code
lang: javascript
---
categoryWidget.showClearButton = true;
```

#### **showHeader**: boolean = true
If truthy, it'll render the heading and the component's description. Default value is `true`.

```code
lang: html
---
<as-category-widget show-header="true"></as-category-widget>
```

```code
lang: javascript
---
categoryWidget.showHeader = false;
```

#### **useTotalPercentage**: boolean = false
If truthy, we'll use the sum of all categories' value to render the bar percentage.
By default, we use the maximum category value to render the bar percentage.

```code
lang: html
---
<as-category-widget use-total-percentage="true"></as-category-widget>
```

```code
lang: javascript
---
categoryWidget.useTotalPercentage = true;
```

#### **visibleCategories**: number = Infinity
The number of visible categories without aggregation.

```code
lang: html
---
<as-category-widget visible-categories="5"></as-category-widget>
```

```code
lang: javascript
---
categoryWidget.visibleCategories = 5;
```

### Styles
There are some CSS Variables that you can override to change visual styles.

#### **\--category-widget\--description\--color**
Default: $color-type-02 (`#1785FB`)

```code
lang: javascript
---
document.body.style.setProperty('--category-widget--description--color', '#1785FB')
```

#### **\--category-widget\--bar\--height**
Default: `4px`

```code
lang: javascript
---
document.body.style.setProperty('--category-widget--bar--height', '8px')
```

#### **\--category-widget\--background-color**
Default: $color-ui-10 (`#FFF`)

```code
lang: javascript
---
document.body.style.setProperty('--category-widget--background-color', '#F5F5F5')
```

#### **\--category-bar\--background-color**
Default: $color-ui-20 (`#F5F5F5`)

```code
lang: javascript
---
document.body.style.setProperty('--category-bar--background-color', '#E2E6E3')
```

### Events

#### **categoriesSelected**
Fired when selected categories changed or selected categories are cleared.

```code
lang: javascript
---
const categoryWidget = document.querySelector('as-category-widget');
categoryWidget.addEventListener('categoriesSelected', event => {
  console.log('Categories Selected', event.detail)
});
```

### Methods

#### **getSelectedCategories**
Get current selected categories
`Returns: Promise<Category[]>`

```code
lang: javascript
---
// Async/Await approach
  const categoryWidget = document.querySelector('as-category-widget');
  await categoryWidget.getSelectedCategories();


// Promises approach
const categoryWidget = document.querySelector('as-category-widget');
categoryWidget.getSelectedCategories()
              .then(categories => console.log(categories));
```

```hint|directive
Please note that you always need to wrap your `await` code in an `async` function. If you use it outisde of an async function, it will raise a `SyntaxError`. Learn more about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).
```

#### **clearSelection**
Clear current selected categories

```code
lang: javascript
---
// Async/Await approach
const categoryWidget = document.querySelector('as-category-widget');
await categoryWidget.clearSelection();


// Promises approach
const categoryWidget = document.querySelector('as-category-widget');
categoryWidget.clearSelection()
              .then(() => {
                 // Whatever you want to do next
               });
```

```hint|directive
Please note that you always need to wrap your `await` code in an `async` function. If you use it outisde of an async function, it will raise a `SyntaxError`. Learn more about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).
```

### Examples

#### Total Percentage
```html
noSource: true
---
<iframe src="/examples/components/as-category-widget/total-percentage.html" style="width: 100%; height: 230px;">
```

[See example](/developers/airship/examples/#example-category-widget-total-percentage)

```code
lang: html
showSource: false
---
<!-- Example using total sum to calculate bar percentages -->
<as-category-widget
  heading="Business Volume"
  description="Description"
  default-bar-color="#47DB99"></as-category-widget>

<script>
  const categoryWidget = document.querySelector('as-category-widget');
  categoryWidget.useTotalPercentage = true;
  categoryWidget.visibleCategories = 2;
  categoryWidget.categories = [
    { name: 'Bars & Restaurants', value: 1000, color: '#FABADA' },
    { name: 'Fashion', value: 900 },
    { name: 'Grocery', value: 800 },
    { name: 'Health', value: 400 },
    { name: 'Shopping mall', value: 250 },
    { name: 'Transportation', value: 1000 },
    { name: 'Leisure', value: 760 }
  ];
</script>
```

#### Bar only widget
```html
noSource: true
---
<iframe src="/examples/components/as-category-widget/bar-only.html" style="width: 100%; height: 256px;">
```

[See example](/developers/airship/examples/#example-category-widget-bar-only)

```code
lang: html
showSource: false
---
<!-- Example widget showing only category bars and footer -->
<as-category-widget
  heading="Business Volume"
  description="Description"
  default-bar-color="#47DB99"></as-category-widget>

<script>
  const categoryWidget = document.querySelector('as-category-widget');
  categoryWidget.showClearButton = true;
  categoryWidget.showHeader = false;
  categoryWidget.visibleCategories = 5;
  categoryWidget.categories = [
    { name: 'Bars & Restaurants', value: 1000, color: '#FABADA' },
    { name: 'Fashion', value: 900 },
    { name: 'Grocery', value: 800 },
    { name: 'Health', value: 400 },
    { name: 'Shopping mall', value: 250 },
    { name: 'Transportation', value: 1000 },
    { name: 'Leisure', value: 760 }
  ];
</script>
```

#### Interaction disabled widget
```html
noSource: true
---
<iframe src="/examples/components/as-category-widget/interaction-disabled.html" style="width: 100%; height: 325px;">
```
[See example](/developers/airship/examples/#example-category-widget-disabled)

```code
lang: html
showSource: false
---
<!-- Example widget with interaction disabled -->
<as-category-widget
  class="as-p--16"
  heading="Business Volume"
  description="Description"
  visible-categories="5"
  disable-interactivity></as-category-widget>

<script>
  var categoryWidget = document.querySelector('as-category-widget');
  categoryWidget.categories = [
    { name: 'Bars & Restaurants', value: 1000 },
    { name: 'Fashion', value: 900 },
    { name: 'Grocery', value: 800 },
    { name: 'Health', value: 400 },
    { name: 'Shopping mall', value: 250 },
    { name: 'Transportation', value: 1000 },
    { name: 'Leisure', value: 760 }
  ];
</script>
```
