# Layouts

Airship is designed to develop Location Intelligence apps without effort. To do this, it provides a set of the most common layouts by default, so that they can be easily used to create your application.

## Overview

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
collapsed: true
---
  <body class="as-app as-app--nav-top">
    <header>
      <nav class="as-toolbar-main"></nav>
    </header>

    <div class="as-app-container">
      <div id="map"></div>
    </div>
  </body>
```

### Toolbar
Toolbar is a generic bar that can be used as a header to put your application logo and some options to navigate throughout your application.

On mobile devices the toolbar is placed always on top but its position can be modified on desktop by using `left` or `right` modifiers in `airship-app` styles.
  - `airship-app--nav-left`: Push the toolbar to the left of the viewport.
  - `airship-app--nav-right`: Push the toolbar to the right of the viewport.

### Toolbar Actions

Toolbar actions are the main toolbar's content, usually icons or links to another app's section. Actions are hidden by default on mobile devices and they are only visible when the `as-toolbar-actions--visible` modifier class is present.

In order to [fit the W3C Accessibility guidelines](https://www.w3.org/WAI/tutorials/menus/) the menu should be an `ul` element where menu item should be a `li` element with a `as-toolbar__item` class.

```code
lang:html
---
<nav class="as-toolbar__actions">
  <ul>
    <li class="as-toolbar__item">
      <img src="https://material.io/tools/icons/static/icons/baseline-fingerprint-24px.svg" alt="Action 1">
      <p class="as-toolbar__icon-text">Action 1</p>
    </li>
    <li class="as-toolbar__item">
      <img src="https://material.io/tools/icons/static/icons/baseline-add_location-24px.svg" alt="Action 2">
      <p class="as-toolbar__icon-text">Action 2</p>
    </li>
  </ul>
</nav>
```

When seeing it in mobile, these actions are grouped in a hamburger menu, needing a button to show the menu.

```code
lang:html
---
<nav class="as-toolbar-main">
  <img onclick="openSideMenu()" class="as-toolbar-main__item as-toolbar-main__toggle" src="https://material.io/tools/icons/static/icons/baseline-menu-24px.svg"
  alt="Open side menu">

  <div class="as-toolbar-actions">
    <span class="as-toolbar-main__item">
      <img src="https://material.io/tools/icons/static/icons/baseline-fingerprint-24px.svg" alt="Ajustes">
      <p>Ajustes</p>
    </span>
  </div>
</div>
```

### Toolbar Example
```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/toolbar.html" style="width: 100%; height: 100%;">
```

```code
lang: html
collapsed: true
---
<body class="as-app as-app--nav-top">
  <header>
    <nav class="as-toolbar-main">
      <img onclick="openSideMenu()" class="as-toolbar-main__item as-toolbar-main__toggle" src="https://material.io/tools/icons/static/icons/baseline-menu-24px.svg"
      alt="Open side menu">

      <div class="as-toolbar-actions">
        <span class="as-toolbar-main__item">
          <img src="https://material.io/tools/icons/static/icons/baseline-fingerprint-24px.svg" alt="Ajustes">
          <p>Ajustes</p>
        </span>
        <span class="as-toolbar-main__item">
          <img src="https://material.io/tools/icons/static/icons/baseline-add_location-24px.svg" alt="Ajustes">
          <p>Ajustes</p>
        </span>
        <span class="as-toolbar-main__item">
          <img src="https://material.io/tools/icons/static/icons/baseline-account_circle-24px.svg" alt="User">
          <p>User</p>
        </span>
        <span class="as-toolbar-main__item">
          <img src="https://material.io/tools/icons/static/icons/baseline-power_settings_new-24px.svg" alt="Rendimiento">
          <p>Rendimiento</p>
        </span>
      </div>
    </nav>
  </header>

  <script>
    function openSideMenu() {
      document.querySelector('.as-toolbar-actions').classList.toggle('as-toolbar-actions--visible');
    }
  </script>
</body>
```

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
