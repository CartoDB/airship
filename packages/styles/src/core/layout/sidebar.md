## Sidebar

Sidebars are beside the map wrapper and its code is located inside `as-map-wrapper`. There are no restrictions regarding the contents of a sidebar.

Sidebars allow you to modify its position and size.

- Position:
  - `as-sidebar--left`: Puts the sidebar on the left of the map.
  - `as-sidebar--right`: Puts the sidebar on the right of the map.
- Size:
  - `as-sidebar--l`: Makes the sidebar width to be `360px`
  - `as-sidebar--xl`: Makes the sidebar width to be `460px`


```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/sidebar.html" style="width: 100%; height: 100%;">
```

```code
lang: html
collapsed: true
---
<header>
    <!-- main -->
    <nav class="as-toolbar-main"><span>SIDEBAR EXAMPLE</span></nav>
    <!-- tabs -->
    <nav class="as-toolbar-tabs">
      <span onclick="_showTab0(event)" class="as-toolbar-tabs__item">LEFT </span>
      <span onclick="_showTab1(event)" class="as-toolbar-tabs__item as-toolbar-tabs__item--active">MAP</span>
      <span onclick="_showTab2(event)" class="as-toolbar-tabs__item">RIGHT</span>
    </nav>
  </header>


  <div class="as-app-container">
    <aside class="as-sidebar as-sidebar--left as-sidebar--xl">
      <h1>Left Sidebar (XL)</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt aliquam nihil nulla quo, cum excepturi commodi saepe dicta
        impedit accusamus, nisi adipisci repellendus expedita rem dolores suscipit! Cumque, nulla culpa?
      </p>
    </aside>

    <div class="as-map-wrapper">
      <div id="map"></div>
    </div>

    <aside class="as-sidebar as-sidebar--right">
      <h1>Right Sidebar</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt aliquam nihil nulla quo, cum excepturi commodi saepe dicta
        impedit accusamus, nisi adipisci repellendus expedita rem dolores suscipit! Cumque, nulla culpa?
      </p>
    </aside>
  </div>
</body>
```
