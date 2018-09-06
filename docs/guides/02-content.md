# Airship Content

Airship is divided into three main packages:

- @carto/airship-components: Web components ready to use in your application.
- @carto/airship-style: CSS classes to provide the foundation for the look and feel of your application.
- @carto/airship-icons: Icon set to use in your HTML.

These three packages are what Airship provides to build your own location intelligence application.

## Components
Airship components are built on top of StencilJS, which allow us to provide lightweight and easy to use components.

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
