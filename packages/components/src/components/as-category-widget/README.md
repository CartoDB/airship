Category widget displays the categories passed to the component as a list with a bar representing the percentage of each category in relation to the maximum category value.

```html
noSource: true
---
<iframe src="/examples/components/as-category-widget/simple.html" style="width: 100%; height: 330px;">
```

```code
lang: html
showSource: false
---
<as-category-widget
  heading="Business Volume"
  description="Description"></as-category-widget>

<script>
  const categoryWidget = document.querySelector('as-category-widget');
  categoryWidget.showClearButton = true;
  categoryWidget.categories = [
    { name: 'Bars & Restaurants', value: 1000, color: '#FABADA' },
    { name: 'Fashion', value: 900 },
    { name: 'Grocery', value: 800 },
    { name: 'Health', value: 400 },
    { name: 'Shopping mall', value: 250 },
    { name: 'Transportation', value: 1000 }
    { name: 'Leisure', value: 760 }
  ];
</script>
```

### Props

#### **categories** (array required)
Array of categories, each category should include a `name` and a `value`. You can also override the bar color for each category with `color`. For example:

```code
lang: javascript
---
categoryWidget.categories = [
  { name: 'A New Hope', value: 359029623, color: '#FABADA' },
  { name: 'The Empire Strikes Back', value: 236513856 },
  { name: 'Return of the Jedi', value: 204338075 },
];
```
#### **defaultBarColor** (string)
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

#### **description** (string)
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

#### **heading** (string)
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

#### **showClearButton** (boolean)
If truthy, it'll show a button to clear selected categories when there are any. Default value is `false`.

```code
lang: javascript
---
categoryWidget.showClearButton = true;
```

#### **showHeader** (boolean)
If truthy, it'll render the heading and the component's description. Default value is `true`.

```code
lang: javascript
---
categoryWidget.showHeader = false;
```

#### **useTotalPercentage** (boolean)
If truthy, we'll use the sum of all categories' value to render the bar percentage.
By default, we use the maximum category value to render the bar percentage.

```code
lang: javascript
---
categoryWidget.useTotalPercentage = true;
```

### Styles
There are some CSS Variables that you can override to change visual styles.

#### **--category-widget--description--color**
Default: $color-type-20 (`#1785FB`)

```code
lang: javascript
---
document.body.style.setProperty('--category-widget--description--color', '#1785FB')
```

#### **--category-widget--bar--height**
Default: `4px`

```code
lang: javascript
---
document.body.style.setProperty('--category-widget--bar--height', '8px')
```

#### **--category-widget--background-color**
Default: $color-ui-10 (`#FFF`)

```code
lang: javascript
---
document.body.style.setProperty('--category-widget--background-color', '#F5F5F5')
```

#### **--category-bar--background-color**
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
`Returns: Category[]`

```code
lang: javascript
---
const categoryWidget = document.querySelector('as-category-widget');
categoryWidget.getSelectedCategories();
```

#### **clearSelection**
Clear current selected categories

```code
lang: javascript
---
const categoryWidget = document.querySelector('as-category-widget');
categoryWidget.clearSelection();
```
