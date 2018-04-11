# Airship
> Airship is a components library built by CARTO

[![CircleCI](https://circleci.com/gh/CartoDB/airship/tree/master.svg?style=svg)](https://circleci.com/gh/CartoDB/airship/tree/master)

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
