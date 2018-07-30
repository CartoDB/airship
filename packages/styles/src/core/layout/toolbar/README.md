### Toolbar

Toolbar is a generic bar that can be used as a header to put your application logo and some options to navigate throughout your application.

On mobile devices, the toolbar is always placed on top, but its position can be modified on desktop by using `left` or `right` modifiers in `as-app` styles.
  - `as-app--nav-left`: Push the toolbar to the left of the viewport.
  - `as-app--nav-right`: Push the toolbar to the right of the viewport.

```html
noSource: true
responsive: true
---
<iframe src="/examples/layouts/toolbar/toolbar.html" style="width: 100%; height: 100%;">
```

```code
lang: html
---
<body class="as-app as-app--nav-top">
  <header class="as-toolbar">
    <button onclick="_toggleDrawer()" class="as-toolbar__item as-toolbar__toggle">
        <img src="https://material.io/tools/icons/static/icons/baseline-menu-24px.svg" alt="">
    </button>
    <li class="as-toolbar__item"> APP LOGO </li>

    <nav class="as-toolbar__actions">
      <ul>
        <li class="as-toolbar__item">
          <a href="http://www.google.es">SOME LINK</a>
        </li>
        <li class="as-toolbar__item">
          <img src="https://material.io/tools/icons/static/icons/baseline-add_location-24px.svg" alt="Action 2">
          <p class="as-toolbar__icon-text">Action 2</p>
        </li>
        <li class="as-toolbar__item">
          <img src="https://material.io/tools/icons/static/icons/baseline-account_circle-24px.svg" alt="Action 3">
          <p class="as-toolbar__icon-text">Action 3</p>
        </li>
        <li class="as-toolbar__item">
          <img src="https://material.io/tools/icons/static/icons/baseline-power_settings_new-24px.svg" alt="Action 4">
          <p class="as-toolbar__icon-text">Action 4</p>
        </li>
      </ul>
    </nav>
  </header>

  <main class="as-app-content">
    <div class="as-map-wrapper">
      <div id="map"></div>
    </div>
  </main>
</body>
```

### Toolbar Content

The toolbar can be customized as you want to include your branding and some other application elements mainly, using `.as-toolbar__item`.

All the content within `.as-toolbar` will be aligned to the left (depending on the toolbar position), except actions which are always aligned to the opposite side.

Here you have the code to add your main logo (click on the <> to see the code):

```html
<header class="as-toolbar">
  <div class="as-toolbar__item">
    <!-- HERE GOES YOUR LOGO -->
    <svg width="130px" height="36px" viewBox="0 0 92 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="filter: invert(1);">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g transform="translate(-162.000000, -282.000000)" fill="#FFFFFF">
          <g transform="translate(162.000000, 282.000000)">
            <path d="M74,36 C83.9411255,36 92,27.9411255 92,18 C92,8.0588745 83.9411255,0 74,0 C64.0588745,0 56,8.0588745 56,18 C56,27.9411255 64.0588745,36 74,36 Z" id="halo" fill-opacity="0.200000018" style="fill: #FFF;"></path>
            <path d="M6.25280899,23.981602 C8.76747566,23.981602 10.220757,22.882802 11.2984713,21.390402 L8.9144367,19.684802 C8.22861851,20.521202 7.52647133,21.078802 6.33445401,21.078802 C4.73421159,21.078802 3.60751029,19.734002 3.60751029,18.012002 L3.60751029,17.979202 C3.60751029,16.306402 4.73421159,14.928802 6.33445401,14.928802 C7.4284973,14.928802 8.1796315,15.470002 8.83279168,16.273602 L11.2168263,14.420402 C10.204428,13.026402 8.70215964,12.042402 6.36711202,12.042402 C2.9053631,12.042402 0.358038428,14.666402 0.358038428,18.012002 L0.358038428,18.044802 C0.358038428,21.472402 2.98700813,23.981602 6.25280899,23.981602 L6.25280899,23.981602 Z M16.732047,23.752002 L20.0468349,23.752002 L20.8632851,21.685602 L25.2884453,21.685602 L26.1048955,23.752002 L29.5013284,23.752002 L24.6352851,12.190002 L21.5817613,12.190002 L16.732047,23.752002 Z M21.7940384,19.209202 L23.0840297,15.962002 L24.357692,19.209202 L21.7940384,19.209202 Z M35.6697093,23.752002 L38.8375361,23.752002 L38.8375361,20.275202 L40.2418305,20.275202 L42.5442201,23.752002 L46.1855881,23.752002 L43.4586443,19.750402 C44.8792677,19.143602 45.810021,17.979202 45.810021,16.208002 L45.810021,16.175202 C45.810021,15.043602 45.4671119,14.174402 44.7976227,13.502002 C44.0301595,12.731202 42.8218132,12.272002 41.0746097,12.272002 L35.6697093,12.272002 L35.6697093,23.752002 Z M38.8375361,17.782402 L38.8375361,15.010802 L40.9276487,15.010802 C41.9727049,15.010802 42.6421941,15.470002 42.6421941,16.388402 L42.6421941,16.421202 C42.6421941,17.257602 42.005363,17.782402 40.9439777,17.782402 L38.8375361,17.782402 Z M55.2605317,23.752002 L58.4283585,23.752002 L58.4283585,15.060002 L61.8574495,15.060002 L61.8574495,12.272002 L51.8477698,12.272002 L51.8477698,15.060002 L55.2605317,15.060002 L55.2605317,23.752002 Z M74,24 C77.3137085,24 80,21.3137085 80,18 C80,14.6862915 77.3137085,12 74,12 C70.6862915,12 68,14.6862915 68,18 C68,21.3137085 70.6862915,24 74,24 Z" style="fill: #FFF;"></path>
          </g>
        </g>
      </g>
    </svg>
  </div>
</header>
```

### Toolbar Actions

Toolbar actions are the main toolbar's content, usually icons or links to another app's section. Actions are hidden by default on mobile devices and they are only visible when the `.as-toolbar-actions--visible` modifier class is present.

In order to fit the [W3C Accessibility guidelines](https://www.w3.org/WAI/tutorials/menus/), we use an `ul` element to layout the menu elements without an specific order, containing `li` elements with a `as-toolbar__item` class.

```code
lang: html
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
lang: html
---
<header class="as-toolbar">
  <button onclick="_toggleDrawer()" class="as-toolbar__item as-toolbar__toggle">
      <img src="https://material.io/tools/icons/static/icons/baseline-menu-24px.svg" alt="">
  </button>

  <div class="as-toolbar__item"> APP LOGO </div>

  <nav class="as-toolbar__actions">
    <ul>
      <li class="as-toolbar__item">
        <a href="http://www.google.es">SOME LINK</a>
      </li>
      <li class="as-toolbar__item">
        <img src="https://material.io/tools/icons/static/icons/baseline-add_location-24px.svg" alt="Action 2">
        <p class="as-toolbar__icon-text">Action 2</p>
      </li>
      <li class="as-toolbar__item">
        <img src="https://material.io/tools/icons/static/icons/baseline-account_circle-24px.svg" alt="Action 3">
        <p class="as-toolbar__icon-text">Action 3</p>
      </li>
      <li class="as-toolbar__item">
        <img src="https://material.io/tools/icons/static/icons/baseline-power_settings_new-24px.svg" alt="Action 4">
        <p class="as-toolbar__icon-text">Action 4</p>
      </li>
    </ul>
  </nav>
</header>

<script>
  function _toggleDrawer() {
    document.querySelector('.as-toolbar__actions').classList.toggle('as-toolbar__actions--visible');
  }
</script>
```

### Tabs
TODO: Add a better explanation

- Tabs are only CSS
- Tabs are hidden by default
- Tabs are visible with the `--visible` modifier
- You need to define custom javascript to control tab visibility
