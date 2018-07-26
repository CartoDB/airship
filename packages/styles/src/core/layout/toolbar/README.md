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
