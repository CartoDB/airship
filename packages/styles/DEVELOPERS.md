# Developer's Guide

- We use [stylelint](https://github.com/stylelint/stylelint) to have a uniform scss files.
- We follow the [BEM](http://getbem.com/) convention 
- We write modular styles, similar to [this](https://zellwk.com/blog/css-architecture-3/)
  - **core**
    - **lib**: Contains all libraries used for the project
    - **helpers**: Contains all `sass` helpers and mixings used in the project
    - **variables**: Contains all `sass` variables.
    - **base:** Basic style reset for native elements
  - **elements:** Every css element has its own folder
  - **utils:** Styles