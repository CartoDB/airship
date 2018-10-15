## Stacked bar chart

A stacked bar chart is a graph that is used to break down and compare parts of a whole. Each column in the chart represents a whole, and the rectangles in the column represent different parts or categories of that whole. Colors are used to illustrate the different categories in the column.

```html
noSource: true
---
<iframe src="/examples/components/as-stacked-bar-widget/simple.html" style="width: 100%; height: 354px;">
```


### Props

#### **data**: Array
Indicates if the legend should be displayed or not. Defaults to true.


#### **meta**: Array


#### **heading**: string=''
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

#### **description**: string=''
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
