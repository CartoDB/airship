# Radio buttons

Radio Buttons are used when the user must make only one selection out of a group of items.

```html
showSource: true
---
<ul>
  <li class="as-radio">
    <input class="as-radio__input" type="radio" name="contact" id="first" value="first" checked />
    <label class="as-caption" for="first">First</label>
  </li>

  <li class="as-radio">
    <input class="as-radio__input" type="radio" name="contact" id="second" value="second" />
    <label class="as-caption" for="second">Second</label>
  </li>

  <li class="as-radio">
    <input class="as-radio__input" type="radio" name="contact" id="third" value="third" disabled />
    <label class="as-caption" for="third">Third</label>
  </li>

  <li class="as-radio">
    <input class="as-radio__input" type="radio" name="contact2" id="fourth" value="fourth" checked disabled />
    <label class="as-caption" for="fourth">Fourth</label>
  </li>
</ul>
```

## CSS Variables

```
.as-radio {
  --as--radio--border-color
  --as--radio--hover--border-color
  --as--radio--checked--border-color
  --as--radio--disabled--color
  --as--radio--disabled--background
}
```