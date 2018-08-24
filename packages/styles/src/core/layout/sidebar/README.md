## Sidebar

Sidebars are the area where your app content lives. Sidebars are located beside the map wrapper and should be placed inside an element with the class `as-map-wrapper`. There are no restrictions regarding the contents of a sidebar.

Sidebar position and size can be changed with the following class modifiers.

- Position:
  - `as-sidebar--left`: Puts the sidebar on the left of the map.
  - `as-sidebar--right`: Puts the sidebar on the right of the map.
- Size:
  - `as-sidebar--l`: Makes the sidebar width to be `360px`
  - `as-sidebar--xl`: Makes the sidebar width to be `460px`



Sidebars are hidden by default in mobile devices and only will be shown when the modifier class `as-sidebar--left--visible` or `as-sidebar--right--visible`  is present.

```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/sidebar/sidebar.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<body class="as-app">
  <div role="tablist" class="as-toolbar-tabs as-tabs">
    <button onclick="showMap(event)" role="tab" class="as-tabs__item as-tabs__item--active">MAP</button>
    <button onclick="showLeft(event)" role="tab" class="as-tabs__item">LEFT</button>
    <button onclick="showRight(event)" role="tab" class="as-tabs__item">RIGHT</button>
  </div>

  <main class="as-app-content">
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
  </main>
</body>
```

## Mobile Sidebar
In order to make a sidebar visible on a mobile phone or any device with a small screen you need to add the `--visible` class modifier you can toggle this class from wherever you want but we recommend using **toolbar-tabs**.

```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/sidebar/sidebar-nav-bot.html" style="width: 100%; height: 100%;">
```


```code
lang: html
---
<body class="as-app">
  <main class="as-app-content">
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
  </main>

  <!-- Tabs on bottom! -->
  <div role="tablist" class="as-toolbar-tabs as-tabs">
    <button onclick="showMap(event)" role="tab" class="as-tabs__item as-tabs__item--active">MAP</button>
    <button onclick="showLeft(event)" role="tab" class="as-tabs__item">LEFT</button>
    <button onclick="showRight(event)" role="tab" class="as-tabs__item">RIGHT</button>
  </div>
</body>
  ```
