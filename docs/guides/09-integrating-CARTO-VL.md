## Advanced guide: Using Airship with CARTO-VL

In this guide, you will learn how to create a map and a Category Widget showing data coming from the map, and reacting to changes in the map, as well as filtering data by using Category Widget.

We'll use [CARTO-VL](https://carto.com/developers/carto-vl/) and Airship to show how they work together properly.

### Airship setup

Let's start from scratch creating an empty `index.html` file with this scaffolding for this guide.

```html
<!DOCTYPE html>
<html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
  </head>
   <body class="as-app-body"></body>
</html>
```

### Including Airship

To use Airship styles and components we need to include them in our HTML. Since we just want to create a simple app we are going to include Airship components and styles through a CDN by including the following snippet in the `<head>` of our application:

```html
<!-- Include CSS  -->
<link rel="stylesheet" href="https://libs.cartocdn.com/airship-style/%AS-VERSION%/airship.css">
<!-- Include Icons -->
<link rel="stylesheet" href="https://libs.cartocdn.com/airship-icons/%AS-VERSION%/icons.css">
<!-- Include Web Components -->
<script src="https://libs.cartocdn.com/airship-components/%AS-VERSION%/airship.js"></script>
```

### Including CARTO-VL

As pointed in the [CARTO-VL docs](https://carto.com/developers/carto-vl/guides/getting-started/) we can also include CARTO-VL in our app using a CDN

```html
<head>
  <!-- Include CARTO VL JS -->
  <script src="https://libs.cartocdn.com/carto-vl/%VL-VERSION%/carto-vl.min.js"></script>
  <!-- Include Mapbox GL JS -->
  <script src="https://libs.cartocdn.com/mapbox-gl/v0.48.0-carto1/mapbox-gl.js"></script>
  <!-- Include Mapbox GL CSS -->
  <link href="https://libs.cartocdn.com/mapbox-gl/v0.48.0-carto1/mapbox-gl.css" rel="stylesheet" />
</head>
```


### Setting a basic layout

A basic layout will just include a container for our map and a sidebar for our future widget.

An airship app always has a container for our main content with `.as-content` class and a `main` tag with the `.as-main` class.

In this case we add a `as-map-area` where the map will be displayed and a `as-sidebar` to contain our widgets.

 ```html
<div class="as-app">
  <div class="as-content">
    <main class="as-main">
      <div class="as-map-area">
        <div id="map"></div>
      </div>
    </main>
    <aside class="as-sidebar as-sidebar--right">

    </aside>
  </div>
</div>
```


### Drawing a map with CARTO-VL
For this guide we are going to use the js code of the [CARTO-VL basic example](https://carto.com/developers/carto-vl/examples/#example-add-carto-dataset-layer) at this point you should see a map with an white space on the right.

```html
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

    const nav = new mapboxgl.NavigationControl({
      showCompass: false
    });
    map.addControl(nav, 'top-left');

    // Define user
    carto.setDefaultAuth({
      user: 'cartovl',
      apiKey: 'default_public'
    });

    // Define layer
    const source = new carto.source.Dataset('ne_10m_populated_places_simple');
    const viz = new carto.Viz();
    const layer = new carto.Layer('layer', source, viz);

    layer.addTo(map, 'watername_ocean');
    layer.on('loaded', hideLoader);

    function hideLoader() {
      document.getElementById('loader').style.opacity = '0';
    }
</script>
```

### Adding a Category Widget

Adding a Category Widget is as simple as including `<as-category-widget>` tag within our `as-sidebar` element, setting the options you prefer.

 ```html
<aside class="as-sidebar as-sidebar--right">
  <as-category-widget
    id="cities-widget"
    heading="Populated places"
    description="Maximun population of the most pouplated cities">
  </as-category-widget>
</aside>
```

#### Binding CARTO-VL data

The category widget will not show any data unless we provide them. For this example, we will simply show the list sorted by the maximum population of cities that can be seen on the map.

To do this we will use the [viewportFeatures expression](https://carto.com/developers/carto-vl/reference/#cartoexpressionsviewportfeatures) which allows us to get the list of the visible features in the viewport.

```js
// We update the viz to get a new @cities variable with the list of visible cities
const viz = new carto.Viz(`
  @cities: viewportFeatures($pop_max, $name),
`);
```

Then we get a reference to the widget to update the data on every map change:

```js
const $categoryWidget = document.querySelector('#cities-widget');
layer.on('updated', updateWidgets);
```

The updateWidgets function will:

- Extract data from the viz object
- Give those data a format compatible with the widget `{name, value}`
- Sort the data to display most populated places first.


```js
function updateWidgets() {
    $categoryWidget.categories = viz.variables.cities.value
      .map(feature => ({
        name: feature.name,
        value: feature.pop_max,
      }))
      .sort((a, b) => b.value - a.value);
  };
```
