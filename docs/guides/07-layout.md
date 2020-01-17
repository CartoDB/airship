Airship offers a restricted series of [optimized layouts](/developers/airship/reference/#/layout) to create LI apps.


<img src="https://raw.githubusercontent.com/CartoDB/airship/master/docs/guides/img/layout.png" alt="Basic layout with all airship elements"/>


An Airship app should always be wrapped inside an element with the `.as-app` class and is composed of the following elements:

- **Toolbar (1)**: Where the main navigation and options are located. Only icons, text and the app logo should be placed here.
- **Tabs**: Used to navigate the app on small screens and control what is displayed in the app-content element. Hidden in desktop.
- **Content (5):** The area where the app content will be visible.
  - **Main:**
    - **Map Area**
      - **Map:** The map itself.
      - **Map Panels (6):** Content areas that are displayed over the map.
    - **Map Footer (4):** Content area located below the map without overlapping.
  - **Sidebar (2, 3)**: One or two sections beside the map wrapper where the main application contents should be placed.

> Check the reference for a detailed description

## Responsive design

LI apps should be responsive by default, we currently consider 2 different screen sizes.

- **Small screens:** Screens smaller than 812px width.
- **Medium screens:** Screens equal or higher than 812px width.


We provide some responsive utilities by default, for example `sidebars` are hidden by default in small screens and only visible adding the `--visible` class modifier.

> We provide a web component named [as-responsive-content](/developers/airship/reference/#/components/application-content) that makes easier the layout design.

## Examples

### Layout

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Include CSS elements -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-style/%AS-VERSION%/airship.css">
  <!-- Include icons -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-icons/%AS-VERSION%/icons.css">
  <!-- Include airship components -->
  <script type="module" src="https://libs.cartocdn.com/airship-components/%AS-VERSION%/airship/airship.esm.js"></script>
  <script nomodule="" src="https://libs.cartocdn.com/airship-components/%AS-VERSION%/airship/airship.js"></script>
</head>
<body class="as-app-body">
  <div class="as-app">
    <header class="as-toolbar"></header>
    <nav class="as-tabs"></nav>

    <div class="as-content">
      <aside class="as-sidebar as-sidebar--left"></aside>

      <main class="as-main">
        <div class="as-map-area">
          <div id="map"></div>

          <div class="as-map-panels">
            <div class="as-panel as-panel--top as-panel--right">
              <div class="as-panel__element as-p--32 as-bg--warning"></div>
            </div>
          </div>

        </div>
        <footer class="as-map-footer as-bg--complementary" style="height: 100px;"></footer>
      </main>

      <aside class="as-sidebar as-sidebar--right"></aside>
    </div>
  </div>

  <!-- Basic CARTO-VL MAP -->
  <script>
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json',
      center: [0, 30],
      zoom: 2,
      scrollZoom: false,
      dragRotate: false,
      touchZoomRotate: false
    });

  </script>
</body>
</html>
```
