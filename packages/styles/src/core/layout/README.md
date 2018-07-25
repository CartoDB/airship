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
---
  <div class="airship-app airship-app--nav-top">
    <header>
      <nav class="as-toolbar-main"></nav>
    </header>

    <div class="as-app-container">
      <div id="map">
        <!-- HERE GOES YOUR MAP-->
      </div>
    </div>
  </div>
```

### Layout with Sidebar

```html
noSource: true
frame: true
---
<div class="airship-app airship-app--nav-top">
  <header>
    <nav class="as-toolbar-main"></nav>
  </header>

  <div class="as-app-container">
    <aside class="as-sidebar as-sidebar--left">
      LEFT-SIDEBAR
    </aside>

    <div id="map"></div>
  </div>
</div>
```

```code
lang: html
---
  <div class="airship-app airship-app--nav-top">
    <header>
      <nav class="as-toolbar-main"></nav>
    </header>

    <div class="as-app-container">
      <div id="map">
        <!-- HERE GOES YOUR MAP-->
      </div>
    </div>
  </div>
```
