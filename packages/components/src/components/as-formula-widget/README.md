Formula widget displays the value passed to the component formatted in an easy to read manner.

```html
noSource: true
---
<iframe src="/examples/components/as-formula-widget/as-formula-widget.html" style="width: 100%; height: 354px;">
```

[See example code](/developers/airship/examples/#example-formula-widget)

```code
lang: html
showSource: false
---
<as-formula-widget
  class="as-p--16"
  heading="Total population"
  description="Description"></as-formula-widget>

<script>
  const formulaWidget = document.querySelector('as-formula-widget');
  formulaWidget.showHeader = true;
  formulaWidget.useTotalPercentage = false;
  formulaWidget.value = 1000;
</script>
```
### CSS Variables

```
as-formula-widget {
  --as--formula-widget--background-color
  --as--formula-widget--description--color
}
```

### Props

#### **value**: number
Number to display within the widget

For example:

```code
lang: javascript
---
formulaWidget.value = 1000;
```

#### **description**: string
Description text of the widget

```code
lang: html
---
<as-formula-widget description="Description"></as-formula-widget>
```
```code
lang: javascript
---
formulaWidget.description = 'Description';
```

#### **valueFormatter**: function
Function that receives the value passed to the widget and returns a string that will be used for value rendering.

By default, it returns the _value_ field formatted sensibly.

The default implementation is the method _defaultFormatter_, so you can use it to keep the original behaviour and add something extra.

```code
lang: javascript
---
formulaWidget.valueFormatter = value => `${formulaWidget.defaultFormatter(value)}€`;
```

#### **heading**: string
Heading text of the widget

```code
lang: html
---
<as-formula-widget heading="Heading"></as-formula-widget>
```
```code
lang: javascript
---
formulaWidget.heading = 'Business Volume';
```

#### **showHeader**: boolean = true
If truthy, it'll render the heading and the component's description. Default value is `true`.

```code
lang: html
---
<as-formula-widget show-header="true"></as-formula-widget>
```

```code
lang: javascript
---
formulaWidget.showHeader = false;
```

#### **isLoading**: boolean=false
Use this attribute to put the widget in "loading mode".
When this attribute is true, the widget won't show any data, a spinner will be placed instead.

```code
lang: html
---
<as-formula-widget is-loading="true"></as-formula-widget>
```
```code
lang: javascript
---
formulaWidget.isLoading = 'true';
```

#### **error**: string=''
Use this attribute to put the widget in "error mode".
When this attribute is given, its text will be shown in the subheader and the widget content won't be displayed.

```code
lang: html
---
<as-formula-widget error="Error!"></as-formula-widget>
```
```code
lang: javascript
---
formulaWidget.error = 'Some error happened, try again!';
```

#### **errorDescription**: string=''
Extended error description shown in the widget content area. Only shown when error attribute is present.

```code
lang: html
---
<as-formula-widget error-description="There is no internet connection"></as-formula-widget>
```
```code
lang: javascript
---
formulaWidget.errorDescription = 'There is no internet connection.';
```

### Styles
There are some CSS Variables that you can override to change visual styles.

#### **\--as\--formula-widget\--background-color**
Default: $color-ui-01 (`#FFF`)

```code
lang: javascript
---
document.body.style.setProperty('--as--formula-widget--background-color', '#FFF')
```

#### **\--as\--formula-widget\--description-color**
Default: $color-type-02 (`#747474`)

```code
lang: javascript
---
document.body.style.setProperty('--as--formula-widget--description--color', '#747474')
```

