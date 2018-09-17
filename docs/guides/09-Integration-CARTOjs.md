## Advanced guide: Using Airship with CARTO.js

In this guide, you will learn how to create a map and a Category Widget showing data coming from the map, and reacting to changes in the map, as well as filtering data by using Category Widget.

We'll use CARTO.js v4 and Airship to show how they work together properly.

### Airship setup
Let's start from scratch creating an empty `index.html` file with this scaffolding for this guide.
```html
> index.html

<!DOCTYPE html>
<html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
  </head>

  <body class="as-app">

  </body>
</html>
```

**How to import Airship in HTML**

To use Airship styles and components we need to include them in our HTML.

Let's include Airship components and styles by including the following snippet in the `<head>` of our application.
```html
<!-- Include CSS  -->
<link rel="stylesheet" href="https://libs.cartocdn.com/airship-style/<VERSION>/airship.css">
<!-- Include Icons -->
<link rel="stylesheet" href="https://libs.cartocdn.com/airship-icons/<VERSION>/icons.css">
<!-- Include Web Components -->
<script src="https://libs.cartocdn.com/airship-components/<VERSION>/airship.js"></script>
```

### Setting a basic layout
A basic layout might include a container for our map and a sidebar for our future widget.

The layout will always be wrapped by a block element with `.as-app-content` class, which will hold all of our content and elements.
So, to create our layout we need a right sidebar and a block element wrapped by `.as-map-wrapper` class for our map.

```html
<main class="as-app-content">
  <div class="as-map-wrapper">
    <div id="map"></div>
  </div>

  <aside class="as-sidebar as-sidebar--right">
  </aside>
</main>
```

Including it in our body will create the desired layout while waiting for the map and the widget.

### Configuring and creating a map with CARTO.js

The next step in our journey is to embed a CARTO.js containing a layer in our layout to fill the blank space.

To load the Maps JavaScript API and Leaflet, use the following tags in the example:
```html
<!-- Include CARTO.js -->
<script src="https://libs.cartocdn.com/carto.js/<VERSION>/carto.min.js"></script>

<!-- Include Leaflet -->
<script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"></script>
<link href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" rel="stylesheet">
```

**Credentials configuration**

Once CARTO.js is properly loaded, we need to configure the client we are going to use for our visualizations.
Please follow instructions in [CARTO.js guide](https://carto.com/developers/carto-js/guides/quickstart/#requesting-an-api-key) to include your own API key in CARTO.js client and import the dataset we are going to use (ne_10m_populated_places_simple).

Our script tag should look like this:
```html
<script>
  const client = new carto.Client({
    apiKey: '{YOUR_API_KEY}',
    username: '{username}'
  });
</script>
```

**Creating a map with a layer in CARTO.js**

First of all, we need to create a map with Leaflet, and set the coordinates we want the map to be in. After that, we are going to add a tile layer with a basemap.

```js
const map = L.map('map').setView([30, 0], 3);

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);
```

Layers are defined with `carto.layer.Layer` which include the dataset name and basic styling options with CartoCSS.

The process to add a layer to a map is:
- Create the source which the map will take data from.
- Write the style which will define the style for our geometries.
- Create the layer itself.
- Add the layer to CARTO client.
- Add CARTO's Leaflet layer to Leaflet map

```js
const source = new carto.source.Dataset('ne_10m_populated_places_simple');
const style = new carto.style.CartoCSS(`
  #layer {
    marker-width: 7;
    marker-fill: #EE4D5A;
    marker-line-color: #FFFFFF;
  }
`);

const layer = new carto.layer.Layer(source, style);

client.addLayer(layer);
client.getLeafletLayer().addTo(map);
```

### Widget creation

Widgets are the best way to show data from our visualization. You can create a dashboard with a map and several widgets that will allow you to visualize and explore your data in a clearer and better way.

**Adding a Category Widget**

Adding a Category Widget is as simple as including `<as-category-widget>` tag within our sidebar tag, setting the options you prefer.

```html
<body>
  <as-category-widget
    heading="Populated places"
    description="Sum of the population grouped by country">
  </as-category-widget>
</body>
```

Although the widget is present in our layout, it lacks some data to display. Let's populate it with data from CARTO.js dataviews.

**Populating Category Widget with CARTO.js dataviews**

Dataviews are the way to get the data which is showed in the map. That way we'll be able to show it in our Category widget.
Listening to `dataChanged` event will allow us to set the proper categories into category widget.

```js
const categoryWidget = document.querySelector('as-category-widget');
const dataView = new carto.dataview.Category(source, 'adm0name', {
  operation: carto.operation.SUM,
  operationColumn: 'pop_max'
});

dataView.on('dataChanged', function (newData) {
  categoryWidget.categories = newData.categories;
});

client.addDataview(dataView);
```

**Filtering map geometries with Category widget**

You can be aware of selected categories in your category widget by listening `categoriesSelected` event. It will fire an event whenever the selected categories change.

Inside the event handler, there will be a `event` parameter containing the selected categories within `event.detail` property. So that we can tell CARTO.js which categories are the ones to be shown in the map.

Leveraging CARTO.js' Source Filters, we can create a filter, attach it to the source and filter the points out in our map.

```js
const selectedCountries = new carto.filter.Category('adm0name', {});
source.addFilter(selectedCountries);

categoryWidget.addEventListener('categoriesSelected', (event) => {
  selectedCountries.setFilters({ in: event.detail });
});
```

**Reacting to map changes in Category Widget**

You can use a Bounding Box filter to clean out data that is outside of browser's viewport, making results relevant to your current visualization.
These are the steps to create and add the filter to our dataview:

- **Create a Bounding Box filter**: Depending on the map rendering library you use (Leaflet or Google Maps) you will have to choose the right filter. As we are using Leaflet in our example, it will be created like this:
```js
const bboxFilter = new carto.filter.BoundingBoxLeaflet(map);
```

- **Add the filter to our dataview**:
```js
dataView.addFilter(bboxFilter);
```

Using that Bounding Box filter, our widget will be automatically updated whenever the map is panned or zoomed.


### Example HTML

```html
<!DOCTYPE html>
<html>
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">

      <!-- Include CSS  -->
      <link rel="stylesheet" href="https://libs.cartocdn.com/airship-style/v1.0.0-alpha.40/airship.css">
      <!-- Include Icons -->
      <link rel="stylesheet" href="https://libs.cartocdn.com/airship-icons/v1.0.0-alpha.40/icons.css">
      <!-- Include Web Components -->
      <script src="https://libs.cartocdn.com/airship-components/v1.0.0-alpha.40/airship.js"></script>

      <!-- Include Leaflet -->
      <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js"></script>
      <link href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" rel="stylesheet">

      <script src="https://libs.cartocdn.com/carto.js/v4/carto.min.js"></script>

      <style>
        body {
          margin: 0;
          padding: 0;
        }

        .widgets {
          padding: 10px;
        }
      </style>
  </head>

  <body class="as-app">
    <main class="as-app-content">
      <div class="as-map-wrapper">
        <div id="map"></div>
      </div>

      <aside class="widgets as-sidebar as-sidebar--right as-sidebar">
          <as-category-widget
          heading="Populated places"
          description="Top populated cities ordered by descending population"
          default-bar-color="#47DB99"></as-category-widget>
      </aside>
    </main>

    <script>
      const client = new carto.Client({
        apiKey: 'default_public',
        username: 'cartojs-test'
      });

      const map = L.map('map').setView([30, 0], 5);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 18
      }).addTo(map);

      const categoryWidget = document.querySelector('as-category-widget');

      const source = new carto.source.Dataset('ne_10m_populated_places_simple');
      const style = new carto.style.CartoCSS(`
        #layer {
          marker-width: 7;
          marker-fill: #EE4D5A;
          marker-line-color: #FFFFFF;
        }
      `);

      const bboxFilter = new carto.filter.BoundingBoxLeaflet(map);

      const dataView = new carto.dataview.Category(source, 'name', {
        operation: carto.operation.SUM,
        operationColumn: 'pop_max'
      });

      dataView.on('dataChanged', function (newData) {
        categoryWidget.categories = newData.categories;
      });

      dataView.addFilter(bboxFilter);
      client.addDataview(dataView);

      const layer = new carto.layer.Layer(source, style);

      client.addLayer(layer);
      client.getLeafletLayer().addTo(map);

      const selectedCities = new carto.filter.Category('name', {});
      source.addFilter(selectedCities);

      categoryWidget.addEventListener('categoriesSelected', (event) => {
        selectedCities.setFilters({ in: event.detail });
      });
    </script>
  </body>
</html>
```
