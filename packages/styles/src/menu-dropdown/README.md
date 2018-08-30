Use a dropdown menu to group a set of options that are only visible when the menu title has the focus.


```html
<div style="width: 240px;" class="as-menu-dropdown">
  <button aria-haspopup="listbox" class="as-menu-dropdown--input"> I'm a dropdown </button>
  <ul tabindex="-1" class="as-menu-dropdown--options">
    <li onclick="onFoo(this)" data-value="all">
      <button>All</button>
    </li>
    <li onclick="onFoo(this)" data-value="spent">
      <button>spent</button>
    </li>
    <li onclick="onFoo(this)" data-value="loaded">
      <button>Loaded</button>
    </li>
    <li onclick="onFoo(this)" data-value="waiting">
      <button>Waiting</button>
    </li>
  </ul>
</div>
```