import React, { Component } from 'react';
import { Grid } from './components';

class App extends Component {
  render() {
    return (
      <Grid width={480} gap={20} align="center">
        <div>Column</div>
        <div>Column</div>
        <div>Column</div>
        <div>Column</div>
        <div>Column</div>
      </Grid>
    );
  }
}

export default App;
