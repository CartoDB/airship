# as-switch

It is a two state button that can be on or off. This component issues a "changed" event each time the user presses it, letting it know if it is on or off.

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

### With Label
```html
<as-switch label="Entire Apartment"></as-switch>
```


## Props

### **checked**: boolean
The presence of this boolean attribute controls whether the switch is checked by default or not.

```code
lang: html
---
<as-switch checked ></as-switch>
```
```code
lang: javascript
---
switch.checked = true;
```

### **disabled**: boolean
The presence of this boolean attribute controls when the switch is enabled.

```code
lang: html
---
<as-switch disabled ></as-switch>
```
```code
lang: javascript
---
switch.disabled = true;
```

### **name**: boolean
The name attribute specifies a name for the element. This name attribute can be used to reference the element in a JavaScript.

```code
lang: html
---
<as-switch name="toggle-layer" ></as-switch>
```
```code
lang: javascript
---
switch.name = 'toggle-layer';
```

### **label**: boolean
Text for label. Positioned on the right of the switch.

```code
lang: html
---
<as-switch label="Entire Apartment"></as-switch>
```
```code
lang: javascript
---
switch.label = 'Entire Apartment';
```


## Events

### **change** `event.detail = boolean`

Triggered by a enabled switch when the user clicks on it.
