# ![](airship.svg) Airship 

> Airship is a components library built by CARTO

[![CircleCI](https://circleci.com/gh/CartoDB/airship/tree/master.svg?style=svg)](https://circleci.com/gh/CartoDB/airship/tree/master)

There are three npm packages for easier use:


| module | status | version | description |
|---|---|---|---|
|  [airship-style](https://www.npmjs.com/package/@carto/airship-style) | ![status](https://img.shields.io/badge/status-in%20progress-orange.svg) | [![npm version](https://badge.fury.io/js/%40carto%2Fairship-style.svg)](https://badge.fury.io/js/%40carto%2Fairship-style)| A complete CSS framework to build location intelligence apps. |
|  [airship-components](https://www.npmjs.com/package/@carto/airship-components) | ![status](https://img.shields.io/badge/status-in%20progress-orange.svg) | [![npm version](https://badge.fury.io/js/%40carto%2Fairship-components.svg)](https://badge.fury.io/js/%40carto%2Fairship-components) | Web components for Location Intelligence apps. |
|  [airship-icons](https://www.npmjs.com/package/@carto/airship-icons) | ![status](https://img.shields.io/badge/status-in%20progress-orange.svg) | [![npm version](https://badge.fury.io/js/%40carto%2Fairship-icons.svg)](https://badge.fury.io/js/%40carto%2Fairship-icons) | High quality icons set |

## Documentation

Check out our [documentation website](https://carto.com/developers/airship/)

## What is Airship?

Airship is a set of tools designed to facilitate the development of Location Intelligence apps by offering layouts, basic patterns, templates, CSS classes, components, widgets and much more. Apps created with Airship will have a consistent UI and an proper UX validated and tested by CARTO.

Airship is currently composed of three fundamental parts: A [CSS framework](https://carto.com/developers/airship/guides/styles/), a library of [Web Components](https://carto.com/developers/airship/guides/web-components/) and a set of [icons](https://carto.com/developers/airship/guides/icons/).

In a Location Intelligence application you can distinguish two parts: the map itself and everything else. Airship helps you with `everything else`, being responsible for the layout and UI of the application. To render the map, you can use one of our rendering libraries like CARTO.js or CARTO-VL.

## Integration with frameworks

Using Airship within your workflow is easy.

For simple elements, load [Airship styles](https://carto.com/developers/airship/guides/styles/) and use its classes in your application along with your own CSS if needed.

For widgets, as Airship widgets are Web Components, they can be integrated in your framework, whether is [React](https://carto.com/developers/airship/guides/integrating-react/), [Vue](https://carto.com/developers/airship/guides/integrating-Vue/), [Angular](https://carto.com/developers/airship/guides/integrating-Angular/) or the newest kid on the block. Read our guides to know how to use them in your current flow.

## License
BSD-3-Clause, see the included [LICENSE.md](LICENSE.md) file.
