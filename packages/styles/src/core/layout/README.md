# Layouts

Airship offers a restricted series of optimized layouts to create LI apps.

```html
noSource: true
responsive: [desktop]
---
<iframe src="/examples/layouts/basic-layout.html" style="width: 100%; height: 100%;">
```

[See example](/developers/airship/examples/#example-basic-layout)

An airship app is composed of the following elements:

- **Toolbar**: Where the main navigation and options are located. Only icons, text and the app logo should be placed here.
- **Tabs**: Used to navigate the app on small screens and control what is displayed in the app-content element.
- **Content:** The area where the app content will be visible.
  - **Main:**
    - **Map Area**
      - **Map:** The map itself.
      - **Map Panels:** Content areas that are displayed over the map.
    - **Footer:** Content area located below the map without overlapping.
  - **Sidebar**: One or two sections beside the map wrapper where the main application contents should be placed.


### Basic Layout

The following example contains a very basic layout with a toolbar and a sidebar.

```code
lang: html
---
<body class="as-app-body">
  <div class="as-app">
    <header class="as-toolbar"></header>
    <div class="as-content">
      <main class="as-main">
        <div class="as-map-area">
          <div id="map"></div>
        </div>
      </main>
      <aside class="as-sidebar as-sidebar--right"></aside>
    </div>
  </div>
</body>
```

### Layout with toolbar, sidebar and map footer

The following snippet lays out:
- a toolbar.
- a sidebar.
- a map footer.

```code
lang: html
---
<body class="as-app-body">
  <div class="as-app">
    <header class="as-toolbar"></header>
    <div class="as-content">
      <main class="as-main">
        <div class="as-map-area">
          <div id="map"></div>
        </div>
        <footer class="as-map-footer as-bg--complementary">
          Footer content
        </footer>
      </main>

      <aside class="as-sidebar as-sidebar--right"></aside>
    </div>
  </div>
</body>
```

### Layout with everything

The following snippet contains:
- a toolbar.
- a sidebar.
- a map panel.
- a map footer.

```code
lang: html
---
<body class="as-app-body">
  <div class="as-app">
    <header class="as-toolbar"></header>
    <div class="as-content">
      <aside class="as-sidebar as-sidebar--left"></aside>

      <main class="as-main">
        <div class="as-map-area">
          <div id="map"></div>
          <div class="as-map-panels">
            <div class="as-panel as-panel--top as-panel--right">
              <div class="as-panel__element"></div>
            </div>
          </div>
        </div>
        <footer class="as-map-footer as-bg--complementary" style="height: 100px;"></footer>
      </main>
    </div>
  </div>
</body>
```
