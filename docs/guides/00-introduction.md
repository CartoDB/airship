# What is Airship ?

Airship are a set of tools designed to facilitate the development of location intelligence apps by offering layouts, basic patterns, templates, css classes, components, widgets and much more. Apps created with airship will have a consistent UI and an propper UX validated and tested by CARTO.

Airship is currently composed of three fundamental parts that can be used separately: A set of icons, a CSS framework and a series of web-components.

In a location intelligence application you can distinguish two parts, the map itself and everything else. Contrary to what you might think Airship is not used to render maps, to do this you have to use one of our map rendering libraries CARTO.js or CARTO-VL. 

Airship is responsible for the layout and UI of the application, once you have the map, Airship is used to generate, a sidebar and its contents, or the map's legends.

# How to use airship ?

> Read our [getting started]() guide for a detailed explanation


The easiest way to include airship is through our CDN, adding the tags in the header of the web:


```html
<!DOCTYPE html>
<html>
<head>
  <!-- Include CSS elements -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-style/<VERSION>/airship.css">
  <!-- Include icons -->
  <link rel="stylesheet" href="https://libs.cartocdn.com/airship-icons/<VERSION>/icons.css">
  <!-- Include airship components -->
  <script src="https://libs.cartocdn.com/airship-components/<VERSION>/airship.js"></script>
</head>
<body>
  <div class="as-p--16">
    <h1 class="as-title">This is a range slider element</h1>
    <as-range-slider></as-range-slider>
    <h1 class="as-title">This is a button</h1>
    <button class="as-btn as-btn--primary">
      <i aria-hidden class="as-icon-plus"></i>
      <p>Im a button!</p>
    </button>
  </div>
</body>
</html>
```
