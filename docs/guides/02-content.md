# Airship Content

Airship is divided into three main packages:

- @carto/airship-components: Web components ready to use in your application.
- @carto/airship-style: CSS classes to provide the foundation for the look and feel of your application.
- @carto/airship-icons: Icon set to use in your HTML.

These three packages are what Airship provides to build your own location intelligence application.

## Components
Airship components are built on top of StencilJS, which allow us to provide lightweight and easy to use components.

You can find the source for all components in [`src/components`](https://github.com/CartoDB/airship/tree/master/packages/components/src/components) folder. Each component has several files associated:
- TSX component file: Main component file where the logic and template is located.
- SASS styles file: Provided component styles.
- Component Tests file: Unit component tests.
- Example HTML file: Component showcase showing all the component variants and behaviour.

Airship components are always lazy loaded, so there is no need to worry about importing the whole bundle or each component separately.
By importing `@carto/airship-components` package, the components loader will be included in your bundle and it will lazy load components by injecting them as soon as they are present in the DOM.

## Styles
Airship styles are split into several folders to allow importing the whole bundle or each style separately, aiming to give flexibility and the possibility to reduce the size of the application's final bundle.

Styles are provided in two different flavours:
- SASS: raw uncompiled styles to process on your own, allowing you to modify variables and customize Airship styles.
- CSS: plain CSS styles to import in your bundle or your HTML directly avoiding the build step.

We follow the same directory scaffolding in both cases, whether they are SASS styles or CSS styles. The root directory for each flavour is:
- CSS: `@carto/airship-style/dist/{path}`
- SASS: `@carto/airship-style/src/{path}`

In case you want to import the whole bundle, you need to import:
- JavaScript: `import '@carto/airship-style';`
- CSS: `@import '~@carto/airship-style';`

If you want to include any of the styles separately, you need to look for the path and append it to the root directory folder.

As of now, we have 16 style components as well as some core styles related to application layout. You can find all of them [here](https://github.com/CartoDB/airship/tree/master/packages/styles/src).

All directories have a similar structure:
- Style file: the main styles for the component, named like the folder.
- `README.md`: a brief explanation of the component and its usage.
- Test folder: Rendering tests to check component's requirements.

Whenever you need to import any of those components, include the appropriate snippet in your code:

SASS styles:
- JavaScript import: `import '@carto/airship-style/src/{path}';`
- SASS import: `@import '~@carto/airship-style/src/{path}';`

CSS styles:
- JavaScript import: `import '@carto/airship-style/dist/{path}';`
- SASS import: `@import '~@carto/airship-style/dist/{path}';`

So, let's say that you want to import badges component, these will be the snippets you can choose from:

SASS styles:
- JavaScript import: `import '@carto/airship-style/src/badges/badges';`
- SASS import: `@import '~@carto/airship-style/src/badges/badges';`

CSS styles:
- JavaScript import: `import '@carto/airship-style/dist/badges/badges';`
- SASS import: `@import '~@carto/airship-style/dist/badges/badges';`

## Icons
Airship includes a set of icons to place into your application. These icons can be found in [this folder](https://github.com/CartoDB/airship/tree/master/packages/icons/src/icons).

Each SVG is automatically generated from a path set in [`paths.js`](https://github.com/CartoDB/airship/blob/master/packages/icons/src/paths.js).

Similarly to styles, we provide the icons in two flavours:
- SVG files: the plain SVG files to include within an `<img>` tag.
- Web Font: the icon font containing the icon glyphs to style them with CSS.

While the SVG files are easier and lightweight to use, the Web Font provides multiple possibilities for customization with CSS.

When including icons package in CSS or SASS via Webpack or another bundler, it will use Web Font by default. If you prefer to use each SVG file separately, you will need to use via CDN or importing it from node_modules folder wherever you want.

Icons' [`dist/` folder](https://github.com/CartoDB/airship/tree/master/packages/icons/dist) is the root content of the npm package. To include each icon separately you need to require the path starting from that folder, like this: `@carto/airship-icons/icons/{icon_name}.svg`. Replacing `{icon_name}` with the desired icon name.
