Minimal UI Kit for CARTO solutions, with reusable components.

## Installation

Airship is available as an [npm package](https://www.npmjs.com/package/@carto/airship).

```code
npm install @carto/airship --save
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
