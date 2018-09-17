# Airship Components
Airship components provides a set of Web components for Location Intelligence apps..

## Getting Started

You can install airship-components using `npm` or downloading it from a `CDN`.

All Airship components are lazy-loaded, that means that each component will be loaded and injected as soon as it is present in the DOM.

### Usage from CDN

The simplest way to use components is to load them from our CDN. You can do that adding the following snippet to the `<head>` of your application.

```html
<head>
    <!-- Include core first -->
    <script src="https://libs.cartocdn.com/airship-components/1.0.0-alpha.41/airship.js"></script>
<head>
```

### Usage from NPM

Just install our package and use it as you wish:

    npm i @carto/airship-components

You need to call the `defineCustomElements` function in your application's entry point to load web components from npm.


```js
import { defineCustomElements } from '@carto/airship-components';

defineCustomElements(window);
```
