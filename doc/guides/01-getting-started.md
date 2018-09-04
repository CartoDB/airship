
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

# Using Airship
Using airship once included in your webpage is very straightforward. 

## Airship Styles

To use airship styles you only need to add CSS classes to the desired HTML fragment.

For example a button can become a Airhip button adding the `as-btn` class.

```html
<button class="as-btn"> Button </button>
```

Airship classes follow [BEM](http://getbem.com/introduction/) conventions, this means that the classes can be of the following types:

- **Block**: Standalone entity that is meaningful on its own. (`.block`)
- **Element**: A part of a block that has no standalone meaning and is semantically tied to its block. (`.block__element`)
- **Modifier**: Modifies the block appearance or behavior. (`.block--modifier`)

For example to create tabs we use the following classes:

`.as-toolbar-tabs` and `.as-tabs` to generate a **tab** block. `.as-tabs__item` to indicate the items and `.as-tabs__item--active` to highlight the active item.

```html
 <div class="as-toolbar-tabs as-tabs" role="tablist">
    <button role="tab" class="as-tabs__item as-tabs__item--active">MAP</button>
    <button role="tab" class="as-tabs__item">LEFT</button>
    <button role="tab" class="as-tabs__item">RIGHT</button>
    <button role="tab" class="as-tabs__item">PANELS</button>
  </div>
```

## Airship Icons
You can use airship icons in two different ways.

### As web font

To display an icon only a class and an `i` tag is required.

```html
<i class="as-icon-twitter"></i>
```


### As svg

> There is no need to include the `icons.css` file when using the icons this way.


Just include the icons from a CDN as regular SVG images. 

```html
<img src="https://libs.cartocdn.com/airship-icons/<VERSION>/icons/twitter.svg" alt="Twitter logo">
```

## Web componenets

Web components should be treated as regular HTML Elements. 

A web component is just an HTML tag with some attributes that control it's behaviour. Simply include the HTML tag, and edit its properties through attributes or through javascript.


For example a range slider


```html
<as-range-slider id="range-slider"></as-range-slider>
<script>
  const slider = document.querySelector('#range-slider');
  slider.addEventListener('change', event => console.log('New value:', event.detail));
</script>
```