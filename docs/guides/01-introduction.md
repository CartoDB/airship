## What is Airship ?

Airship are a set of tools designed to facilitate the development of location intelligence apps by offering layouts, basic patterns, templates, CSS classes, components, widgets and much more. Apps created with Airship will have a consistent UI and an propper UX validated and tested by CARTO.

Airship is currently composed of three fundamental parts that can be used separately: A CSS framework, a series of web-components and a set of icons.

In a Location Intelligence application you can distinguish two parts: the map itself and everything else. Contrary to what you might think, Airship is not used to render maps, to do this you have to use one of our map rendering libraries [CARTO.js](/developers/carto-js/) or [CARTO-VL](/developers/carto-vl/).

Airship is responsible for the layout and UI of the application. Once you have the map, Airship is used to generate, for instance, a sidebar and its contents or the map's legends.

### How to use Airship ?

> Read our [getting started](getting-started) guide for a detailed explanation


The easiest way to include Airship is through our CDN, adding the tags in the header of the web:


```html
<!DOCTYPE html>
<html>
<head>
  <!-- Include CSS elements -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-style/%AS-VERSION%/airship.css">
  <!-- Include icons -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-icons/%AS-VERSION%/icons.css">
  <!-- Include airship components -->
  <script src="https://libs.cartocdn.com/airship-components/%AS-VERSION%/airship.js"></script>
  <!-- Include Mapbox GL JS -->
  <script src="https://libs.cartocdn.com/mapbox-gl/v0.48.0-carto1/mapbox-gl.js"></script>
  <!-- Include Mapbox GL CSS -->
  <link href="https://libs.cartocdn.com/mapbox-gl/v0.48.0-carto1/mapbox-gl.css" rel="stylesheet" />
</head>
<body class="as-app">

  <header class="as-toolbar"></header>
  <nav class="as-tabs"></nav>

  <div class="as-content">
    <aside class="as-sidebar as-sidebar--left"></aside>

    <main class="as-main">
      <div class="as-map-area">
        <div id="map"></div>

        <div class="as-map-panels">
          <div class="as-panel as-panel--top as-panel--right">
            <div class="as-panel__element as-p--32 as-bg--support-02"></div>
          </div>
        </div>

      </div>
      <footer class="as-map-footer as-bg--complementary" style="height: 100px;"></footer>
    </main>

    <aside class="as-sidebar as-sidebar--right"></aside>
  </div>

  <!-- Mapbox basemap -->
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
