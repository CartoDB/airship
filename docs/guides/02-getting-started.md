## Installing Airship

You can install airship-style using `npm` or downloading it from a `CDN`.

Airship is composed of 3 packages that can be used independently:

  - **airship-styles**: A complete CSS framework to build Location Intelligence apps.
  - **airship-icons**: High quality icons set availiable as svg or web-font.
  - **airship-components**: Web components for Location Intelligence apps.

### Usage from a CDN

The simplest way to use Airship is to load it from CARTO CDN by including the following snippet in the head of your web application.

```html
<head>
  <!-- Include CSS  -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-style/%AS-VERSION%/airship.css">
  <!-- Include Icons -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-icons/%AS-VERSION%/icons.css">
  <!-- Include Web Components -->
  <script src="https://libs.cartocdn.com/airship-components/%AS-VERSION%/airship.js"></script>
<head>
```

### Usage from NPM

**Styles and fonts**

Just install our packages and use it as you wish. We recommend to use [webpack loaders](https://github.com/webpack-contrib/css-loader) to inject the styles in your app.

    npm i @carto/airship-style @carto/airship-icons

Once installed you can just import all the files or only a small subset.


```js
// Import all styles
import '@carto/airship-styles';
```

```js
// Import only core styles and tables
import '@carto/airship-style/dist/core/core.css';
import '@carto/airship-style/dist/table/table.css';
```

**Web components**

    npm i @carto/airship-components

You need to call the `defineCustomElements` function (better in the app entry point) to use the web components from npm.


```js
import { defineCustomElements } from '@carto/airship-components/dist/loader';

defineCustomElements(window);
```

## Using Airship
Using Airship once included in your webpage is very straightforward.

### Airship Styles

To use Airship styles, you only need to add CSS classes to your HTML.

For example a simple button can become an Airship button by simply adding the `as-btn` class.

```html
<button class="as-btn"> Button </button>
```

Airship classes follow [BEM](http://getbem.com/introduction/) conventions, this means that the classes can be of the following types:

- **Block**: Standalone entity that is meaningful on its own. (`.block`)
- **Element**: A part of a block that has no standalone meaning and is semantically tied to its block. (`.block__element`)
- **Modifier**: Modifies the block appearance or behavior. (`.block--modifier`)

The following classes are part of a tabs element:

`.as-toolbar-tabs` and `.as-tabs` to generate a **tab** block. `.as-tabs__item` to indicate the items and `.as-tabs__item--active` to highlight the active item.

```html
 <div class="as-toolbar-tabs as-tabs" role="tablist">
    <button role="tab" class="as-tabs__item as-tabs__item--active">MAP</button>
    <button role="tab" class="as-tabs__item">LEFT</button>
    <button role="tab" class="as-tabs__item">RIGHT</button>
    <button role="tab" class="as-tabs__item">PANELS</button>
  </div>
```

### Airship Icons
You can use Airship icons in two different ways.

**As web font**

To display an icon only a class and an `i` tag is required.

```html
<i class="as-icon-twitter"></i>
```


**As SVG**

> There is no need to include the `icons.css` file when using the icons this way.


Just include the icons from a CDN as regular SVG images.

```html
<img src="https://libs.cartocdn.com/airship-icons/%AS-VERSION%/icons/twitter.svg" alt="Twitter logo">
```

### Web components

Web components should be treated as regular HTML Elements.

A web component is just an HTML tag with some attributes that control its behaviour. Simply include the HTML tag, and edit its properties through attributes or through javascript.


For example a range slider


```html
<as-range-slider id="range-slider"></as-range-slider>
<script>
  const slider = document.querySelector('#range-slider');
  slider.addEventListener('change', event => console.log('New value:', event.detail));
</script>
```


### Basic template

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
  <!-- Include CARTO VL -->
  <script src="https://libs.cartocdn.com/carto-vl/v1.2/carto-vl.min.js"></script>
  <!-- Include Mapbox GL JS -->
  <script src="https://api.tiles.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.js"></script>
  <!-- Include Mapbox GL CSS -->
  <link rel="stylesheet" href="https://api.tiles.mapbox.com/mapbox-gl-js/v0.52.0/mapbox-gl.css" />
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
              <div class="as-panel__element as-p--32 as-bg--support-02"></div>
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
      style: carto.basemaps.voyager,
      center: [0, 30],
      zoom: 2
    });

  </script>
</body>
</html>
```

### Reducing bundle size

To get a better [page speed performance](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery), we suggest you to only include the styles that are being used in your app.

While Airship will automatically inject necessary components as soon as they are inserted in the DOM, you need to specify which CSS elements you want to load in advance. Here's an example:

```html
<head>
  <!-- Always Include core first -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-style/dist/core/core.css">
  <!-- Include the elements used by your app -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-style/dist/button/button.css">
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-style/dist/table/table.css">
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-style/dist/tabs/tabs.css">
  <!-- (optional) Include utils at the end -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-style/dist/utilities/utilities.css">
<head>
```
