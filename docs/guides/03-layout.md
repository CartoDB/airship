Airship offers a restricted series of optimized layouts to create LI apps.

An Airship app should always be wrapped inside an element with the `.as-app` class and is composed of the following elements:

- **Toolbar**: Where the main navigation and options are located. Only icons, text and the app logo should be placed here.
- **Tabs**: Used to navigate the app on small screens and control what is displayed in the app-content element.
- **App Content:** The area where the app content will be visible.
  - **Sidebar**: One or two sections beside the map wrapper where the main application contents should be placed.
  - **Map Wrapper**: The area where the map will be placed is composed by:
    - **Map:** The map itself.
    - **Floating Panels:** Content areas that are displayed over the map.
    - **Bottom Bar:** Content area located below the map without overlapping.

> Check the reference for a detailed description 

## Responsive design

LI apps should be responsive by default, we currently consider 2 different screen sizes.

- **Small screens:** Screens smaller than 812px width.
- **Medium screens:** Screens equal or higher than 812px width.


We provide some responsive utilities by default, for example `sidebars` are hidden by default in small screens and only visible under the `--visible` class modifier.


## Examples

### Basic layout

```html
<body class="as-app">
  <main class="as-app-content">

    <aside class="as-sidebar as-sidebar--left">

    </aside>

    <div class="as-map-wrapper">
      <!-- Put your map here -->
    </div>
  </main>
</body>
```


### Basic layout with toolbar

```html
<body class="as-app">
  <header class="as-toolbar"></header>

  <main class="as-app-content">

    <aside class="as-sidebar as-sidebar--left">

    </aside>

    <div class="as-map-wrapper">
      <!-- Put your map here -->
    </div>
  </main>
</body>
```