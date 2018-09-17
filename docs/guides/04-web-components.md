### Web components

Airship provides a set of [web components](https://www.webcomponents.org/introduction). One of the key features of the Web Components standard is the ability to offer custom elements that encapsulate functionality on an HTML page, rather than having to make do with a long, nested batch of elements that together provide a custom page feature.

This is especially interesting to create geospatial widgets, such as a histogram or a category widget where instead of writing all the code from scratch every time you can use just a simple a custom element.


```html
<as-category-widget
  heading="Business Volume"
  description="Description"
  default-bar-color="#47DB99">
</as-category-widget>
```

**Attributes**

[Attributes](https://en.wikipedia.org/wiki/HTML_attribute) modify the default functionality of an element. The attributes will usually have a default value and using them will be optional. In the example above, heading and description are required attributes while the bar color is optional. 

HTML Attributes can only be `strings` so if you want to use an object as an attribute you need to use javascript to get access to the element and set up the attribute via code.

You can assign the attributes to the element properties, or use [setAttribute](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute) method to do it in a different way.

```js
const $categoryWidget = document.querySelector('as-category-widget');
const categoriesList = [
  { name: 'A New Hope', value: 359029623, color: '#FABADA' },
  { name: 'The Empire Strikes Back', value: 236513856 },
  { name: 'Return of the Jedi', value: 204338075 },
];

// Same as: $categoryWidget.setAttribute('categories', categoriesList);
$categoryWidget.categories = categoriesList;
```

**Loading web components**

Loading and using web components is very easy, you just need to include our component loader in the head of your app. Once the loader is included, it will automatically detect the use of web-components and load them on demand. It also detects browser capabilities and will automatically decide whether or not to include polyfills, leading to smaller bundles in modern browsers.

```html
<head>
  <!-- Include the loader on the header -->
  <script src="https://libs.cartocdn.com/airship-components/%VERSION%/airship.js"></script>
</head>
<body>
  <!-- Use Web components as a regular HTML Elements and the loader will take care of the rest -->
  <as-histogram-widget></as-histogram-widget>
</body>
```

> The loader may conflict with the webpack bundler if the [publicPath](https://webpack.js.org/guides/public-path/) property is not configured correctly.

**List of Web Components**

> See the most recent list in [the reference](../reference)

**Framework integration**

You can use Airship components with another web frameworks like Angular, React or Vue. See [https://stenciljs.com/docs/framework-integration](https://stenciljs.com/docs/framework-integration).

[TODO: LINK TO AIRSHIP DEMOS]

**Browser support**

Airship Components are build with Stencil, that run natively or near-natively in all widely used browsers.

Web Components are a set of standardized browser APIs centered around the Custom Elements v1 spec, a cross-browser way to define and create essentially new HTML tags, and is the successor to the now-defunct v0 spec.

Custom Elements are natively supported in Chrome and Safari (including iOS!) and are coming to both Edge and Firefox. In fact, Firefox has native support behind a flag, indicating full native support is near.

For browsers without native support, a small polyfill helps developers use Custom Elements seamlessly and with little performance overhead.

Stencil uses a dynamic loader to load the custom elements polyfill only on browsers that need it. With this polyfill Stencil's browser support is Chrome (and all chrome based browsers), Safari, Firefox, Edge, and IE11.

Web Components are being used in production since 2017 with the above approach.


| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge+| 63+ | 67+ | 11.1+ | 10.3+