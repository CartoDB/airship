# Layouts

Airship is designed to develop Location Intelligence apps without effort. To do this, it provides a set of the most common layouts by default, so that they can be easily used to create your application.

An Airship app should always be wrapped inside an element with the `.as-app` class and is composed of the following elements:

- **Toolbar**: Where the main navigation and options are located. Only icons, text and the app logo should be placed here.
- **Sidebar**: One or two sections beside the map wrapper where the main application contents should be placed.
- **Map Wrapper**: The area where the map will be placed.

### Basic Layout

The following example contains an very basic layout with an empty toolbar on top and an `app-container` with a sample CARTO.js map.

```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/basic-layout.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<body class="as-app">
  <header class="as-toolbar"></header>

  <main class="as-app-content">
    <div class="as-map-wrapper">
      <div id="map"></div>
    </div>
  </main>
</body>
```
