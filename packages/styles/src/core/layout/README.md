# Layouts

Airship offers a restricted series of optimized layouts to create LI apps.

An Airship app should always be wrapped inside an element with the `.as-app` class and is composed of the following elements:

- **Toolbar**: Where the main navigation and options are located. Only icons, text and the app logo should be placed here.
- **Tabs**: Used to navigate the app on small screens and control what is displayed in the app-content element.
- **App Content:** The area where the app content will be visible.
  - **Sidebar**: One or two sections beside the map wrapper where the main application contents should be placed.
  - **Map Wrapper**: The area where the map will be placed is composed by:
    - **Map:** The map itself.
    - **Floating Panels:** Content areas that are displayed over the map.
    - **Bottom Bar:** Content area located below the map without overlapping.

### Basic Layout

The following example contains a very basic layout with blue toolbar and two green sidebars.

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

    <aside class="as-sidebar as-sidebar--left" style="background: #80B622;">

    </aside>

    <div class="as-map-wrapper" style="background: #B5E0F9;">
      <!-- Put your map here -->
    </div>

    <aside class="as-sidebar as-sidebar--right" style="background: #80B622;">

    </aside>

  </main>
</body>
```
