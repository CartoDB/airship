# Airship Style

Airship style is a css framework oriented to develop your Location Intelligence apps.

## Getting Started

You can install airship-style using `npm` or downloading it from a `CDN`.

Airship styles are distributed in small files so you can choose to load only the components that you are going to use improving your [page speed performance](https://developers.google.com/speed/docs/insights/OptimizeCSSDelivery). We also provide an `airship.css` file with all the styles packaged in a single file.

The following files are available:

- `core.css`: Common CSS, including layouts, fonts, etc
- `utilities.css`: CSS helpers
- `<element>.css`: The specific styles for an element, for example the button styles would be in `button.css`


### Usage from a CDN

The simplest way to use airship styles is just load them from a CDN this way you can choose which components to dowload. Remember to load the core first and the utils at the end.

```code
lang: html
---
<head>
  <!-- Include core first -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@carto/airship-style/dist/core/core.css">
  <!-- Include the needed components -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@carto/airship-style/dist/button/button.css">
  <!-- Include utils at the end -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@carto/airship-style/dist/utils/utils.css">
<head>
```

You can use [jsDelivery to combine our files and generate a single request](https://www.jsdelivr.com/features#combine):

```code
lang: html
---
<head>
  <!-- Include Styles combined with jsDelivery -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/npm/@carto/airship-style/dist/core/core.css,npm/@carto/airship-style/dist/button/button.css">
<head>
```

Or you can load all our styles at once:


```code
lang: html
---
<head>
  <!-- Include all styles -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/npm/@carto/airship-style/dist/airship.css">
<head>
```

### Usage from NPM

Just install our package and use it as you wish:

    npm i @carto/airship-style

We provide both `dist` and `src` files so you can create a custom [sass](https://sass-lang.com/) build.


## Customization

TBD

