# Layouts

Airship offers a restricted series of optimized layouts to create LI apps.

```html
noSource: true
responsive: [desktop]
---
<iframe src="/examples/layouts/basic-layout.html" style="width: 100%; height: 100%;">
```

An airship app is composed of the following elements:

- **Toolbar**: Where the main navigation and options are located. Only icons, text and the app logo should be placed here.
- **Tabs**: Used to navigate the app on small screens and control what is displayed in the app-content element.
- **Content:** The area where the app content will be visible.
  - **Main:**
    - **Map Area**
      - **Map:** The map itself.
      - **Map Panels:** Content areas that are displayed over the map.
    - **Footer:** Content area located below the map without overlapping.
  - **Sidebar**: One or two sections beside the map wrapper where the main application contents should be placed.


### Basic Layout

The following example contains a very basic layout with blue toolbar and two green sidebars.
