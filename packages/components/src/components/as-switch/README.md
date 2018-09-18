# as-switch

It displays a control to select a range of two numbers from a predefined interval, dragging a slider. Selection can be determined using one or two values. When using one value, the range goes from the minimum to the selected value. When using two, the minimum value can be also configured.

## Examples

### Simple 

```html
<as-switch id="switch-0" name="switch" title="switch"></as-switch>
```

### Checked

```html
<as-switch checked id="switch-1" name="switch-1" title="switch-1"></as-switch>
```


### Disabled
```html
<as-switch disabled id="switch-2" name="switch-2" title="switch-2"></as-switch>
```


## Props

### **checked**: boolean
The presence of this boolean attribute controls when the switch is checked by default.

### **disabled**: boolean
The presence of this boolean attribute controls when the switch is enabled.)

### **name**: boolean
The name attribute specifies a name for the element. This name attribute can be used to reference the element in a JavaScript.


## Events
All events return an array with one value (simple mode) or two (range).

### **change** `event.detail = boolean`

Triggered by a enabled switch when the user clicks on it.


```html

<as-switch id="switch-example" name="switch-example" title="switch-example"></as-switch>

<script>
  document.querySelector('#switch-example').addEventListener('change', event => {
    console.log(event.detail); // true/false
  });)
</script>
```