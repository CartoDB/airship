# Airship
> Airship is a components library built by CARTO

[![CircleCI](https://circleci.com/gh/CartoDB/airship/tree/master.svg?style=svg)](https://circleci.com/gh/CartoDB/airship/tree/master)

## What is rocking here

* [React](https://webpack.js.org/guides/getting-started/)
* [styled-components](http://postcss.org/)

## Installation
Airhsip is available as a NPM package:

```
npm install --save carto-airship
```

or

```
yarn add carto-airship
```

# Usage
Import components from Airship:

```js
//ES6 import syntax
import { Button } from 'carto-airship';

//CommonJS require syntax
const { Button } = require('carto-airship');
```

Airship components are used just like any other React component. You can also customise them with props:

```jsx
// Primary button
<Button>Hello there</Button>

// Secondary button
<Button secondary>General Kenobi</Button>
```

For a more detailed usage guide check out our [documentation](#).

# Contributing

Everyone is welcome to contribute. Please take a moment to read the [contributing guidelines](CONTRIBUTING.md).

# License
BSD 3-Clause, see the included [LICENSE.md](LICENSE.md) file.
