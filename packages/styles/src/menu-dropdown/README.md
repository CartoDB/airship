Use a dropdown menu to group a set of options that are only visible when the menu title has the focus.


```html
showSource: true
---
<div style="width: 240px;" class="as-menu-dropdown">
  <button aria-haspopup="listbox" class="as-menu-dropdown--input"> I'm a dropdown </button>
  <ul tabindex="-1" class="as-menu-dropdown--options">
    <li>
      <button>All</button>
    </li>
    <li>
      <button>spent</button>
    </li>
    <li>
      <button>Loaded</button>
    </li>
    <li>
      <button>Waiting</button>
    </li>
  </ul>
</div>
```
