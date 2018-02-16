import React, { Component } from 'react';
import {
  Grid,
  Jumbo,
  Display,
  Title,
  Subheader,
  Text,
  Caption
} from './components';

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

        <Jumbo margin="0 0 20px">
          I'm thinking two circus clowns dancing. You?
        </Jumbo>
        <Jumbo as="h2">I'm a Jumbo h2</Jumbo>
        <Jumbo as="h2" font="mono">
          I'm a Jumbo h2 mono
        </Jumbo>
        <Jumbo as="h2" weight="medium">
          I'm a Jumbo h2 medium
        </Jumbo>
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
        <Title as="h3" weight="medium">
          I'm a Title h3
        </Title>

        <Subheader>I'm thinking two circus clowns dancing. You?</Subheader>
        <Subheader as="h2">I'm a Subheader h2</Subheader>
        <Subheader as="h2" font="mono">
          I'm a Subheader h2 mono
        </Subheader>
        <Subheader as="h3" color="#ff9900">
          I'm a Subheader h3
        </Subheader>

        <Text>I'm thinking two circus clowns dancing. You?</Text>
        <Text as="div">I'm a Text div</Text>
        <Text color="#ff9900">I'm a Text colored</Text>
        <Text as="div" font="mono">
          I'm a Text div mono
        </Text>

        <Caption as="span">I'm a Caption span</Caption>
        <Caption font="mono" color="skyblue">
          I'm a Caption mono as span
        </Caption>
        <Caption as="div" weight="medium" color="skyblue">
          I'm a Caption medium
        </Caption>
      </div>
    );
  }
}

export default App;
