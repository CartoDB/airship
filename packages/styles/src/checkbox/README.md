Use checkboxes when looking for yes or no answers. The `for` attribute is necessary to bind our custom checkbox with the input.

A checkbox consists of 3 sub-elements wrapped inside an `as-checkbox` parent.

- `as-checkbox-input` Native Input element handling the logic.
- `as-checkbox-decoration`: Custom animated svg used to achieve the tick effect.
- `label`: Optional but recommended for a better UI and accessibility.


```html
showSource: true
---
<div class="as-checkbox">
  <input class="as-checkbox-input" type="checkbox" id="checkbox-0" name="checkbox-0" value="checkbox-0">
  <span class="as-checkbox-decoration">
    <svg class="as-checkbox-media">
      <polyline class="as-checkbox-check" points="1.65093994 3.80255127 4.48919678 6.97192383 10.3794556 0.717346191"></polyline>
    </svg>
  </span>
  <label class="as-caption" for="checkbox-0"> Checkbox</label>
</div>

<div class="as-checkbox">
  <input checked class="as-checkbox-input" type="checkbox" id="checkbox-1" name="checkbox-1" value="checkbox-1">
  <span class="as-checkbox-decoration">
    <svg class="as-checkbox-media">
      <polyline class="as-checkbox-check" points="1.65093994 3.80255127 4.48919678 6.97192383 10.3794556 0.717346191"></polyline>
    </svg>
  </span>
  <label class="as-caption" for="checkbox-1"> Checkbox checked</label>
</div>
```

## Checkbox errors
You can give checkboxes an error-status using the `as-checkbox-input--error` class modifier on the `input` element.


```html
showSource: true
---
<div class="as-checkbox">
    <input class="as-checkbox-input as-checkbox-input--error" type="checkbox" id="checkbox3" name="checkbox3" value="checkbox3">
    <span class="as-checkbox-decoration">
      <svg class="as-checkbox-media">
        <polyline class="as-checkbox-check" points="1.65093994 3.80255127 4.48919678 6.97192383 10.3794556 0.717346191"></polyline>
      </svg>
    </span>
    <label class="as-caption" for="checkbox3"> Checkbox Error</label>
  </div>

  <div class="as-checkbox">
    <input checked class="as-checkbox-input as-checkbox-input--error" type="checkbox" id="checkbox4" name="checkbox4" value="checkbox4">
    <span class="as-checkbox-decoration">
      <svg class="as-checkbox-media">
        <polyline class="as-checkbox-check" points="1.65093994 3.80255127 4.48919678 6.97192383 10.3794556 0.717346191"></polyline>
      </svg>
    </span>
    <label class="as-caption" for="checkbox4"> Checkbox Error checked</label>
  </div>
</section>
```

## Checkbox status

The checkbox appearance will change when you add attributes like `disabled` or `checked`.

```html
showSource: true
---
 <div class="as-checkbox">
  <input disabled class="as-checkbox-input" type="checkbox" id="checkbox2" name="checkbox2" value="checkbox2">
  <span class="as-checkbox-decoration">
    <svg class="as-checkbox-media">
      <polyline class="as-checkbox-check" points="1.65093994 3.80255127 4.48919678 6.97192383 10.3794556 0.717346191"></polyline>
    </svg>
  </span>
  <label class="as-caption" for="checkbox2"> Checkbox Disabled</label>
</div>

<div class="as-checkbox">
  <input disabled class="as-checkbox-input as-checkbox-input--error" type="checkbox" id="checkbox3" name="checkbox3" value="checkbox3">
  <span class="as-checkbox-decoration">
    <svg class="as-checkbox-media">
      <polyline class="as-checkbox-check" points="1.65093994 3.80255127 4.48919678 6.97192383 10.3794556 0.717346191"></polyline>
    </svg>
  </span>
  <label class="as-caption" for="checkbox3"> Checkbox Error Disabled</label>
</div>
```
