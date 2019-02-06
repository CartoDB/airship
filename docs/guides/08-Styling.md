## Advanced guide: Styling

In this guide, you'll learn how to apply custom styling to Airship components and styles letting them look like your brand.

We'll show you three levels of customization, which will let you customize styles through different levels of difficulty.

### Customizing Airship with CSS variables
CSS variables are entities that contain values meant to be reused throughout the CSS styles. In Airship, we use them to create consistent design all over the components and styles.

A CSS variable can be defined in CSS code, as well as in JavaScript code.

```css
:root {
  --main-background-color: #FFF;
}

.element {
  --element-background-color: #E1E2E3;
}
```

```js
document.body.style.setProperty('--main-background-color', '#FFF');

element.style.setProperty('--element-background-color', '#E1E2E3');
```

We defined many CSS variables all over our styles to be customizable. Please go to component's documentation to find which variables you can override in your application.

Let's say that we want to override our application primary's color, which is set in `--as--color--primary`.

As all CSS variables we want to override, we would need to override it after requiring Airship styles or each component style, depending on the case, in our HTML, JavaScript, or SASS, due to CSS cascade.

**Customizing CSS variables in CSS**

Customizing a CSS variable is simple. You just have to write the selector and put the variable to override inside that selector rules.

To override a global variable like `--as--color--primary`, which doesn't specifically belong to any of the components, you need to put it into a `:root` selector.

```html
<!-- Include CSS -->
<link rel="stylesheet" href="https://libs.cartocdn.com/airship-style/%AS-VERSION%/airship.css">

<!-- Override --as--color--primary -->
<style>
  :root {
    --as--color--primary: #E1E2E3;
  }
</style>
```

Most of the color in our components come from general variables, such as the one above, or the ones set in core.css. But you might find some which are defined within the component's scope.

In that case, you need to override it within the components' selector.

We're going to change the default background color for the `.map_panels` style. For each layout element and component, we've a set of **css-variables**, also called **custom properties**, to customize these elements individually.

In this case, the variable is called `--as-map-panels--background-color`, and we want it to be `#EEE`. As we can see, `--as-map-panels--background-color` is within `.as-map-panels`, we need to do it like this:

```html
<!-- Include CSS -->
<link rel="stylesheet" href="https://libs.cartocdn.com/airship-style/%AS-VERSION%/airship.css">

<!-- Override --as-map-panels--background-color -->
<style>
  .as-map-panels {
    --as-map-panels--background-color: #EEE;
  }
</style>
```

**Customizing CSS variables in SASS**

Similarly to the example above, we can override CSS variables in SASS.

After importing Airship Style bundle, or each of the styles separately, in our SCSS file, you can override CSS variables like as if you were in plain CSS.

```css
@import '~@carto/airship-styles';

:root {
  --as--color--primary: #E1E2E3;
}
```

Likewise, if you want to override a CSS variable inside a component selector, you can do it like this:

```css
@import '~@carto/airship-styles';

.as-map-panels {
  --as-map-panels--background-color: #EEE;
}
```

**Warning**: Assigning SASS variables to CSS variables won't work as you would expect. If you want to set CSS variable's value to a SASS variable, you will have to interpolate its value into the variable itself: `--css-variable: #{$sass-variable}`.

**Customizing CSS variables in JavaScript**

To customize a CSS variable within JavaScript code, you can use `.setProperty()` method.

Overriding CSS variables in JavaScript is not much similar to the other cases.

To override a global CSS variable, you can execute `.setProperty` on `document.body` style rules.
```js
document.body.style.setProperty('--main-background-color', '#FFF');
```

To override a variable which is inside a component, you need to get the reference and then you can do the usual override procedure:
```js
const componentElement = document.querySelector('.as-map-panels');
componentElement.style.setProperty('--panels-bg-color', '#EEE');
```

Although, if you have more than one instance of the element at the same time, you will need to loop through them and set the property to every instance of the element.

```js
const componentElement = document.querySelectorAll('.as-panel__element');
componentElement.forEach(element => element.style.setProperty('--panels-bg-color', '#EEE'));
```

### Customizing Airship with SASS variables
Even though you have customization through CSS Variables, they might not be suitable for all cases. If you cannot use CSS variables, and hence you might need to customize styles in build time.

Our SASS variables are defined like this:
```css
$color-primary: #FFF !default;
```

It means the variable will only be defined if there were no previously defined variable with the same name.

As we did with CSS variables, you will need to override SASS variables **before** Airship ones are defined in your `.scss` file.
```css
$color-primary: #E1E2E3;

@import '~@carto/airship-style';
```

Doing it that way, it will take first defined variables as the one to use to generate styles.

Please find SASS variables to override within each style reference documentation.

### Overriding any rule with CSS
CSS and SASS variables are powerful, but they don't allow you to modify each rule within Airship Styles. So, if you want to customize Airship beyond variables, you will need to override rules by targeting specific selectors.

As you might now, every DOM node should have one or many CSS classes set, so whenever you want to modify something you will need write a selector that targets that node.

Let's say that you want to make all title's font size bigger. Looking at the typography classes, you find one named `as-title` whose font definition is:
```css
font: 24px/32px var(--font-family-base, Roboto, sans-serif);
```

To change it to our desired value, you will need to write that selector **after** Airship Styles import in CSS, like:
```css
@import '~@carto/airship-style';

.as-title {
  font: 32px/32px var(--font-family-base, Roboto, sans-serif);
}
```

or HTML version:
```html
<link rel="stylesheet" href="https://libs.cartocdn.com/airship-style/%AS-VERSION%/airship.css">

<style>
.as-title {
  font: 32px/32px var(--font-family-base, Roboto, sans-serif);
}
</style>
```
