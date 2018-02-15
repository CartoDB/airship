import React, { Component } from 'react';
import { Grid, Jumbo, Display, Title, Subheader, Text } from './components';

class App extends Component {
  render() {
    return (
      <div>
        <Grid width={480} gap={20} align="center">
          <div>Column</div>
          <div>Column</div>
          <div>Column</div>
          <div>Column</div>
          <div>Column</div>
        </Grid>

        <Jumbo>I'm thinking two circus clowns dancing. You?</Jumbo>
        <Jumbo as="h2">I'm a Jumbo h2</Jumbo>
        <Jumbo as="h3" color="#ff9900">
          I'm a Jumbo h3
        </Jumbo>

        <Display margin="0 0 20px">
          I'm thinking two circus clowns dancing. You?
        </Display>
        <Display as="h2">I'm a Display h2</Display>
        <Display as="h3" color="#ff9900">
          I'm a Display h3
        </Display>

        <Title>I'm thinking two circus clowns dancing. You?</Title>
        <Title as="h2">I'm a Title h2</Title>
        <Title as="h3" color="#ff9900">
          I'm a Title h3
        </Title>

        <Subheader>I'm thinking two circus clowns dancing. You?</Subheader>
        <Subheader as="h2">I'm a Subheader h2</Subheader>
        <Subheader as="h3" color="#ff9900">
          I'm a Subheader h3
        </Subheader>

        <Text>I'm thinking two circus clowns dancing. You?</Text>
        <Text as="div">I'm a Text div</Text>
        <Text color="#ff9900">I'm a Text colored</Text>
      </div>
    );
  }
}

export default App;
