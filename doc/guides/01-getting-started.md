
# Installing Airship

You can install airship-style using `npm` or downloading it from a `CDN`. 

Airship is composed of 3 packages that can be used independently:

  - **airship-styles**: A complete CSS framework to build Location Intelligence apps.
  - **airship-icons**: High quality icons set availiable as svg or web-font.
  - **airship-components**: Web components for Location Intelligence apps.

## Usage from a CDN

The simplest way to use airship styles is just load them from a CDN including the following in the head of your web-application.

```html
<head>
  <!-- Include CSS  -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-styles/<VERSION>/airship.css">
  <!-- Include icons -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-icons/<VERSION>/icons.css">
  <!-- Include Web Components -->
  <script src="https://libs.cartocdn.com/airship-components/<VERSION>/airship.js"></script>
<head>
```

### Reducing bundle size

To get a better [page speed performance](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery) we suggest to include only the items that are being used in your app.

While the `web-component loader` will only inject required web components for the styles you need to specify which elements you want to load:

```html
<head>
  <!-- Always Include core first -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-styles/dist/core/core.css">
  <!-- Include the components used by your app -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-styles/dist/button/button.css">
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-styles/dist/table/table.css">
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-styles/dist/tabs/tabs.css">
  <!-- (optional) Include utils at the end -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-styles/dist/utilities/utilities.css">
<head>
```


## Usage from NPM

### Styles and fonts

Just install our packages and use it as you wish:

    npm i @carto/airship-style @carto/airship-icons

Take a look at [sass-loader](https://github.com/webpack-contrib/sass-loader) if you are using webpack. We provide both `dist` and `src` files so you can create a custom [sass](https://sass-lang.com/) build.

### Web components

    npm i @carto/airship-components

You need to call the `defineCustomElements` function to use the web components from npm.


```js
import { defineCustomElements } from '@carto/airship-components';

defineCustomElements(window);
```
