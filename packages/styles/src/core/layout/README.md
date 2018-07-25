# Layouts

Airhip is designed to develop Location Intelligence apps with the least possible effort. To do this, it provides the most common layouts by default so that they can be easily included.

## Overview

An airship app should always be wrapped inside an element with the `.airship-app` class. 

You usually have the following elements:

- **Toolbar**: A small bar where the main navigation and options are located, only icons, text and the app logo should be placed here.
- **Sidebar**: Sidebars are located beside the map wrapper, you can place almost everything you want in the sidebars. 
- **Map Wrapper**: This is the area where the map will be placed. Airship has some utilities to place floating panels over the map.


### Basic Layout

```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/basic-layout.html" style="width: 100%; height: 100%;">
```

```code
lang: html
collapsed: true
---
  <body class="airship-app airship-app--nav-top">
    <header>
      <nav class="as-toolbar-main"></nav>
    </header>

    <div class="as-app-container">
      <div id="map"></div>
    </div>
  </body>
```

### Layout with Sidebar

```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/with-sidebar.html" style="width: 100%; height: 100%;">
```

```code
lang: html
collapsed: true
---
<body class="airship-app airship-app--nav-top">
  <header>
    <nav class="as-toolbar-main">
    </nav>
    <nav class="as-toolbar-tabs">
      <span onclick="_showMap(event)" class="as-toolbar-tabs__item as-toolbar-tabs__item--active">Map</span>
      <span onclick="_showLegends(event)" class="as-toolbar-tabs__item">Legends</span>
    </nav>
  </header>


  <div class="as-app-container">
    <aside class="as-sidebar as-sidebar--left">
      Legends
    </aside>

    <div class="as-map-wrapper">
      <div id="map"></div>
    </div>
  </div>

  <script>
    function _showLegends(event) {
      document.querySelector('.as-sidebar.as-sidebar--left').classList.add('as-sidebar--left--visible');
      document.querySelector('.as-toolbar-tabs .as-toolbar-tabs__item--active').classList.remove('as-toolbar-tabs__item--active');
      event.target.classList.add('as-toolbar-tabs__item--active');
    }

    function _showMap(event) {
      document.querySelector('.as-sidebar.as-sidebar--left').classList.remove('as-sidebar--left--visible');
      document.querySelector('.as-toolbar-tabs .as-toolbar-tabs__item--active').classList.remove('as-toolbar-tabs__item--active');
      event.target.classList.add('as-toolbar-tabs__item--active');
    }
  </script>
</body>
```

## Sidebar

Sidebars are located beside the map wrapper and should be located inside the `as-map-wrapper`. There is no restrictions regarding to the contents of a sidebar.

Sidebars have to kinds of modifiers: position and size.

- Position:
  - `as-sidebar--left`: Puts the sidebar on the left of the map.
  - `as-sidebar--right`: Puts the sidebar on the right of the map.
- Size:
-  `as-sidebar--l`: Makes the sidebar width to be `360px` 
-  `as-sidebar--xl`: Makes the sidebar width to be `460px` 


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