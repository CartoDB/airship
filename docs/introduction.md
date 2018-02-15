Minimal UI Kit for Carto solutions, with reusable components.

## Installation

Airship is available as an [npm package](https://www.npmjs.com/package/airship).

```sh
npm install airship --save
```

## Usage

Here is a quick example to get you started, it's all you need:

```jsx static
import { render } from 'preact';
import { Button } from 'airship';

function App() {
  return (
    <Button>
      Hello World
    </Button>
  );
}

render(<App />, document.querySelector('#app'));
```
