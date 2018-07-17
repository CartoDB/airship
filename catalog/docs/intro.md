Minimal UI Kit for CARTO solutions, with reusable components.

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

Here is a quick example to get you started, it's all you need:

```code
lang: js
---
import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from '@carto/airship';

function App() {
  return (
    <Button>
      Hello World
    </Button>
  );
}

ReactDOM.render(<App />, document.querySelector('#app'));
```
