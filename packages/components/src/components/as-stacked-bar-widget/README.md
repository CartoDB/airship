## Stacked bar chart

A stacked bar chart is a graph that is used to break down and compare parts of a whole. Each column in the chart represents a whole and the rectangles in the column represent different parts or categories of that whole. Colors are used to illustrate the different categories in the column.

```html
noSource: true
---
<iframe src="/examples/components/as-stacked-bar-widget/simple.html" style="width: 100%; height: 354px;">
```

```code
lang: html
showSource: false
---
<as-stacked-bar-widget id="widget-0" show-legend="true" heading="Star Wars Revenue" description="Description"></as-stacked-bar-widget>

<script>
  const widget0 = document.querySelector('as-stacked-bar-widget');
  widget0.data = [{
      category: 'Star Wars Ep. IV: A New Hope',
      values: {
        dvd: 27229125,
        blue: 3555058,
      }
    },
    {
      category: 'Star Wars Ep. V: The Empire Strikes Back',
      values: {
        dvd: 24928640,
        blue: 2738207,
      },
    },
    {
      category: 'Star Wars Ep. VI: Return of the Jedi',
      values: {
        dvd: 23786454,
        blue: 1908593,
      }
    }
  ];

  widget0.metadata = {
    dvd: {
      label: 'Domestic DVD Sales',
      color: '#33ACEE'
    },
    blue: {
      label: 'Domestic Blu-ray Sales',
      color: '#EEC649'
    }
  }

</script>
```


### Props

#### **data**: Array<RawStackedBarData>
Array of elements containing the data that will be shown in the stacked bar chart.

Each element corresponds to a column and consists of a `category` string that labels the column and an object containing the values of each rectangle in the column.

Each key in the `values` object will be displayed using the same column in every column. Positive values will be stacked in alphabetical order on the top of the zero-axis while negative values will be stacked below the zero axis in reverse alphabetical order.

```code
lang: javascript
---
stackedBarWidget.data = [{
    category: 'Star Wars Ep. IV: A New Hope',
    values: {
      dvd: 27229125,
      blue: 3555058,
    }
  },
  {
    category: 'Star Wars Ep. V: The Empire Strikes Back',
    values: {
      dvd: 24928640,
      blue: 2738207,
    },
  },
  {
    category: 'Star Wars Ep. VI: Return of the Jedi',
    values: {
      dvd: 23786454,
      blue: 1908593,
    }
  }
];
```


#### **metadata**: Object
Use this property to control bar colors and labeling.



```code
lang: javascript
---
stackedBarWidget.metadata = {
  dvd: {
    label: 'Domestic DVD Sales',
    color: '#33ACEE'
  },
  blue: {
    label: 'Domestic Blu-ray Sales',
    color: '#EEC649'
  }
}
```

#### **heading**: string
Heading text of the widget

```code
lang: html
---
<as-stacked-bar-widget heading="Heading"></as-stacked-bar-widget>
```
```code
lang: javascript
---
stackedBar.heading = 'Heading';
```

#### **description**: string
Description text of the widget

```code
lang: html
---
<as-stacked-bar-widget description="Description"></as-stacked-bar-widget>
```
```code
lang: javascript
---
stackedBar.description = 'Description';
```


#### **showLegend**: boolean=true
Indicates if the legend should be displayed or not. Defaults to true.

```code
lang: html
---
<as-stacked-bar-widget show-legend="false"></as-stacked-bar-widget>
```
```code
lang: javascript
---
stackedBar.showLegend = 'false';
```
