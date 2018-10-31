Dropdown menu allows you to create a selectable list from a series of options.


```html
noSource: true
---
<iframe src="/examples/components/as-dropdown/simple.html" style="width: 100%; height: 215px;">
```
[See example](/developers/airship/examples/#example-as-dropdown)


```code
lang: html
showSource: false
---
<as-dropdown
  default-text="Dropdown"
  can-clear="true"></as-dropdown>

<script>
  const dropdown = document.querySelector('as-dropdown');
  dropdown.options = [
    { text: 'All', value: 'all' },
    { text: 'Open', value: 'open' },
    { text: 'Unfulfilled', value: 'unfulfilled' },
    { text: 'Unpaid', value: 'unpaid' }
  ];
</script>
```

### Props

#### **options**: DropdownOption[] = []
Array of options to display in the dropdown

The options should have the following format:
```code
lang:typescript
---
{ text: 'All', value: 'all' }
```

Text is the display value for the option, and value is the property which the component emits as the selected value.

For example:

```code
lang: javascript
---
dropdown.options = [
  { text: 'All', value: 'all' },
  { text: 'Open', value: 'open' },
  { text: 'Unfulfilled', value: 'unfulfilled' },
  { text: 'Unpaid', value: 'unpaid' }
];
```

#### **selectedOption**: string
Use it for setting the selected option or to retrieve its current value.

For example:

```code
lang: html
---
<as-dropdown selected-option="All"></as-dropdown>
```

```code
lang: javascript
---
dropdown.selectedOption = 'All';
var option = dropdown.selectedOption;
// option: 'All'
```

#### **defaultText**: string
Default text to show when no option is selected

For example:

```code
lang: html
---
<as-dropdown default="Dropdown"></as-dropdown>
```

```code
lang: javascript
---
dropdown.defaultText = 'Dropdown';
```

#### **showClearButton**: boolean = false
Allow the user to clear selected option

For example:

```code
lang: html
---
<as-dropdown show-clear-button="true"></as-dropdown>
```

```code
lang: javascript
---
dropdown.showClearButton = true;
```

#### **onClickOutside**: function
This function will be called when the user clicks outside of the dropdown. By default, it closes the list.

```code
lang: javascript
---
const dropdown = document.querySelector('as-dropdown');
dropdown.onClickOutside = () => {
  console.log('User has clicked outside of the dropdown');
  dropdown.closeList();
};
```

### Styles
There are some CSS Variables that you can override to change visual styles.

#### **\--dropdown-main-color**
Default: $color-primary (`#1785FB`)

```code
lang: javascript
---
const dropdown = document.querySelector('as-dropdown');
dropdown.style.setProperty('--dropdown-main-color', '#1785FB')
```


### Events

#### **optionChanged**
Fired when selected option changes or option is cleared.

```code
lang: javascript
---
const dropdown = document.querySelector('as-dropdown');
dropdown.addEventListener('optionChanged', function (event) {
  console.log('Selected Option:', event.detail);
});
```

### Methods

#### **closeList**
Closes the dropdown list. Useful when overriding the default `onClickOutside`

```code
lang: javascript
---
const dropdown = document.querySelector('as-dropdown');
dropdown.closeList();
```
