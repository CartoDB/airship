## CSS Styles
One of the packages we provide within Airship is Airship Styles.

Airship Styles offer CSS elements for you to build LI applications, giving a good look and feel to your users without effort. You can build the foundation of your app leveraging these styles and customize them to match your brand identity.

### Installation

**From NPM**
  Install [@carto/airship-style](https://www.npmjs.com/package/@carto/airship-style) package from npm

  ```
  npm i @carto/airship-style --save
  ```

  Importing styles in SASS, PostCSS

  ```css
  // Import whole SASS bundle
  @import '~@carto/airship-style';

  // Import SASS element styles
  @import '~@carto/airship-style/src/{path}';

  // Import CSS element styles
  @import '~@carto/airship-style/dist/{path}';
  ```

  Importing styles in JavaScript

  ```javascript
  // Import whole SASS bundle
  import '@carto/airship-style';

  // Import SASS element styles
  import '@carto/airship-style/src/{path}';

  // Import CSS element styles
  import '@carto/airship-style/dist/{path}';
  ```

  **Warning:** Depending on the version you want to use, you will need a CSS loader or SASS loader for Webpack to be able to parse those files.

**From CDN**

Copy-paste the stylesheet `<link>` tag into your `<head>` tag before other stylesheets to load Airship CSS.

```html
<link rel="stylesheet" href="https://libs.cartocdn.com/airship-style/%AS-VERSION%/airship.css" crossorigin="anonymous" integrity="">
```

### Usage

After importing the package in your current application, you only need to set some CSS classes to your current HTML, or use a components' example HTML content to test it out.

For example, you can show a button with this HTML scaffolding:

```html
<button class="as-btn as-btn--primary">
  I'm a regular button
</button>
```

Please check [styles reference](/developers/airship/reference/#/styles/buttons) out and see how to use Airship CSS styles.

### Framework integration
To integrate Airship into your framework you only need to import the styles in the way you prefer from the ones stated above and apply them to your generated HTML.

### Basic Customization
> If you want advanced customization of Airship styles, please take a look at [this guide](/developers/airship/guides/Styling).

**CSS Variables**

CSS Variables provide CSS foundation in Airship, making it fully customizable.

There is a set of common Airship CSS variables which include `primary color`, `secondary color` and `font family`, among others. Please check the list [here](https://github.com/CartoDB/airship/blob/master/packages/styles/src/core/core.scss#L8).

CSS Variables can be accessed and overriden in runtime using JavaScript using this syntax:

```js
// Get variable from inline styles
element.style.getPropertyValue('--as--color--primary');

// Set variable on inline styles
element.style.setProperty('--as--color--primary', javaScriptVariable);
```

We recommend you to set CSS Variables in `document.body` to be available throughout the application.
```js
// Set variable on document.body
document.body.style.setProperty('--as--color--primary', javaScriptVariable);
```

There are many properties that can be customizable to create your own look and feel for your application, please dive into each element and component documentation to know all the properties that you can override

**SASS Variables**

You can customize Airship even more using SASS Variables. There's a whole set of variables for colors, shadows, sizes and typography to customize within Airship. Please check them out [here](https://github.com/CartoDB/airship/tree/master/packages/styles/src/core/variables).

To customize SASS variables, you need to include your own variables matching Airship ones before including Airship styles.

```css
> my-variables.scss

$color-primary: #FABADA;
```

```css
/** Your own variables **/
@import 'my-variables';

/** Whole bundle **/
@import '~@carto/airship-style';

/** Custom importing of styles **/
@import '~@carto/airship-style/src/core/variables/variables';
@import '~@carto/airship-style/src/tabs/tabs';
```

You can override variables no matter which flavour of styles you prefer, whether the whole bundle or custom importing of styles.

**CSS Override**

There is another way to customize Airship via overriding CSS classes.

To override a CSS class, create a selector matching the element you want to modify and apply your own styles. Be careful because the selector that you added to your CSS has to be always below the original one to be able to override it.

```css
@import '~@carto/airship-style';

.as-btn {
  background-color: #FABADA;
}
```

### Browser Compatibility
Airship styles are known to work in latest stable version of all major browsers, and Internet Explorer 11 on Windows.

However, we use CSS Variables to provide customization, and they might not be available in all browsers. We provide a fallback for those browsers in order to give the same experience to users, but take it into account when customizing Airship.
