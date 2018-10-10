# as-responsive-content

This component manages the layout of the application. It searches for our layout elements and manages for you the responsiveness behaviour, creating the correspondant panels. See `Layout` section for more information on our layout elements.

## How to use it

Add a `<as-responsive-content>` element as a wrapper for the application sections.

The component searches for these classes in order to know how many tabs it must render:
- `as-main`.
- `as-sidebar`.
- `as-map-panels`.
- `as-map-footer`.

As long as you follow the proper markup, as the `Layout` section shows, you won't have to worry about anything else.

This component replaces `.as-content` HTML element, so it needs to wrap all your children elements to work properly. Here is an example:

```code
lang: html
---
<body class="as-app">
  <!-- Here goes your toolbar -->

  <as-responsive-content>
    <aside class="as-sidebar as-sidebar--left">
      LEFT-SIDEBAR
    </aside>

    <main class="as-main">
      <div class="as-map-area">
        <div class="as-map">
          <div id="map"></div>
        </div>

        <div class="as-map-footer">
          Map Footer
        </div>
      </div>
    </main>
  </as-responsive-content>
</body>
```

```hint|directive
Take into account that any layout dependent JavaScript code, like Leaflet or MapboxGL map, that use any elements inside the component will need to be executed after `ready` event is fired. Please check [`ready` event documentation](/developers/airship/reference/imported_content/catalog/#/components/application-content?a=ready).
```

### Setting the tab names

In order to set the tabs text, you need to add a data attribute with the desired name:

`<aside class="as-sidebar as-sidebar--left" data-name="Stores">`

`<div class="as-map-panels" data-name="Legends">`

`<aside class="as-sidebar as-sidebar--right" data-name="Containers">`

You can change that data attribute programatically if you need to update the responsive tab name.

### Example

```html
noSource: true
responsive: true
---
<iframe src="/examples/components/as-responsive-content/simple.html" style="width: 100%; height: 100%;">
```
[See example](/developers/airship/examples/#example-simple)

### Changing the tab order

If you want to change the tabs order, you can add a data attribute to tell the component their positions.

Let's put `Legends` in the first position, `Stores` in the second and `Containers` in third place.

```code
lang: html
showSource: false
---
<div class="as-main" data-tab-order="0">

<div class="as-map-panels" data-name="Legends" data-tab-order="1">

<aside class="as-sidebar as-sidebar--left" data-name="Stores" data-tab-order="2">

<aside class="as-sidebar as-sidebar--right" data-name="Containers" data-tab-order="3">
```

We recommend setting the map always at the position `0`.

```html
noSource: true
responsive: true
---
<iframe src="/examples/components/as-responsive-content/custom-order.html" style="width: 100%; height: 100%;">
```

[See example](/developers/airship/examples/#example-custom-order)

## Events

### **ready**

This event fires when the component has finished loading. Useful to load Leaflet with the proper content width and height.

```code
lang: javascript
---
const responsiveContent = document.querySelector('as-responsive-content');
responsiveContent.addEventListener('ready', () => {});
```

```hint|directive
To avoid errors with layout dependent JavaScript code, we recommend you to execute all your JavaScript code inside the ready event.
```

So, if you want to load a Leaflet map with some CARTO.js layers, you better put that code inside load event handler, like this:
```code
lang: javascript
---
const responsiveContent = document.querySelector('as-responsive-content');
responsiveContent.addEventListener('ready', () => {
  const map = L.map('map', {
    zoomControl: false
  }).setView([30, 0], 3);
  map.scrollWheelZoom.disable();

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);

  const client = new carto.Client({
    apiKey: 'default_public',
    username: 'cartojs-test'
  });

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
});
```

### **sectionChanged**

This event fires when the content section is changed via clicking a tab or via the programmatic method.

```code
lang: javascript
---
const responsiveContent = document.querySelector('as-responsive-content');
responsiveContent.addEventListener('sectionChanged', (section) => { console.log(section); });
```

## Methods

### **getSections()**

This method return a list of the sections discovered throughout the content with some interesting properties, such as:

```code
lang: typescript
---
interface ApplicationSection {
  active?: boolean;
  activeAction?: (section: ApplicationSection) => {};
  activeClass?: string;
  disableAction?: (section: ApplicationSection) => {};
  element: HTMLElement;
  name: string;
  type: string;
  tabOrder: number;
}
```

```code
lang: javascript
---
// Async/Await approach
const responsiveContent = document.querySelector('as-responsive-content');
await responsiveContent.getSections();

// Promises approach
const responsiveContent = document.querySelector('as-responsive-content');
responsiveContent.getSections()
               .then(sections => console.log(sections));
```
```hint|directive
Please note that you always need to wrap your `await` code in an `async` function. If you use it outisde of an async function, it will raise a `SyntaxError`. Learn more about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).
```

### **setVisible(sectionName)**

This method changes visible content section by introducing the section name like:

```code
lang: javascript
showSource: false
---
// Async/Await approach
const responsiveContent = document.querySelector('as-responsive-content');
await responsiveContent.setVisible('sectionName');

// Promises approach
const responsiveContent = document.querySelector('as-responsive-content');
responsiveContent.setVisible()
                 .then(() => {
                   // Whatever you want to do next
                 });
```
```hint|directive
Please note that you always need to wrap your `await` code in an `async` function. If you use it outisde of an async function, it will raise a `SyntaxError`. Learn more about it [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await).
```
