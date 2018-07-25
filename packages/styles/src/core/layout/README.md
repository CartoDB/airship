# Layouts

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
      <div id="map">
        <!-- HERE GOES YOUR MAP-->
      </div>
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
