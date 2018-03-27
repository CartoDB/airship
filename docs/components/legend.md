Use this component to show extra information about the data.

```react
<Legend>
  <Legend.Panel>
    <Subheader>Hello world</Subheader>
  </Legend.Panel>
</Legend>
```

A Legend component it's just a wrapper, use it with other components to compose more complex visual hierarchies.

```react
<Legend>
  <Legend.Panel>
    <Steps>
      <Steps.Header>
        <Subheader>Florida</Subheader>
      </Steps.Header>
      <Steps.Content>
        <Text>On every trip, there’s this moment for each person when they stop, take a deep breath and lift their faces to take in the sun</Text>
      </Steps.Content>
      <Steps.Content>
        <Text>For Captain Kane, every day in Florida is an opportunity to play in the sunshine. That includes combing the beaches of Sanibel and Captiva, known the world over as shell-hunting paradises, for prized local finds like the junonia, the turrid and the Fine-cut Nutmeg.</Text>
      </Steps.Content>
      <Steps.Content>
        <Text>There’s literally millions of tons of shell material, and every day it regenerates. You can walk out one morning, and the next morning it’s totally different.</Text>
      </Steps.Content>
      <Steps.Content>
        <Text>Sunlight activates humans.</Text>
      </Steps.Content>
    </Steps>
  </Legend.Panel>
</Legend>
```

```react
<Legend>
  <Legend.Panel>
    <Collapsible>
      <Collapsible.Header>
        <Subheader>Global Index</Subheader>
      </Collapsible.Header>
      <Collapsible.Content>
        <Toggle htmlFor='active'>
          <Text>Active</Text>
        </Toggle>
      </Collapsible.Content>
    </Collapsible>
  </Legend.Panel>
  <Legend.Panel>
    <Collapsible>
      <Collapsible.Header>Patter</Collapsible.Header>
      <Collapsible.Content>
        <img src="http://subtlepatterns2015.subtlepatterns.netdna-cdn.com/patterns/swirl_pattern.png" />
      </Collapsible.Content>
    </Collapsible>
  </Legend.Panel>
</Legend>
```

### Props

#### **small** (boolean)

It handles the legend's width. By default is `false`.

```react
<Legend small>
  <Legend.Panel>
    <Subheader>Hello world</Subheader>
  </Legend.Panel>
</Legend>
```
