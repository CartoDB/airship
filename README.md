# Airship
> Airship is a components library built by CARTO

[![npm version](https://badge.fury.io/js/%40carto%2Fairship.svg)](https://badge.fury.io/js/%40carto%2Fairship)
[![CircleCI](https://circleci.com/gh/CartoDB/airship/tree/master.svg?style=svg)](https://circleci.com/gh/CartoDB/airship/tree/master)

## ⚠️ WARNING ⚠️

We're changing the approach of Airship. After gathering feedback from several partners and users, we are recoding the widgets as Web Components and providing a CSS framework for layout and simple components. In our tests this has been easily integrated with React, Angular or vanilla and will help us to broaden our partners support. A React components-only library has not worked as well as we thought initially.

That means that this current Airship branch is stale and no further development on React is expected. Feel free to fork the current project and make whatever change you need in case you need the widgets as React components.

Sorry for the inconveniences.

## Installation
Airship is available as an [npm package](https://www.npmjs.com/package/@carto/airship).

```
# Using NPM
npm install --save @carto/airship

# Using Yarn
yarn add @carto/airship
```

React, ReactDOM, PropTypes and styled-components are peer dependencies, if you haven't already installed them you can use:

```
# Using NPM
npm install --save react react-dom prop-types styled-components

# Using Yarn
yarn add react react-dom prop-types styled-components
```

## Usage
Import components from Airship:

```js
//ES6 import syntax
import { Button } from '@carto/airship';

//CommonJS require syntax
const { Button } = require('@carto/airship');
```

Airship components are used just like any other React component. You can also customise them with props:

```jsx
// Primary button
<Button>Hello there</Button>

// Secondary button
<Button secondary>General Kenobi</Button>
```

For a more detailed usage guide check out our [documentation](https://carto-airship.netlify.com).

## Contributing

Everyone is welcome to contribute. Please take a moment to read the [contributing guidelines](CONTRIBUTING.md).

## License
BSD-3-Clause, see the included [LICENSE.md](LICENSE.md) file.
