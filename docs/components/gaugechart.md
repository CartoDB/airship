Talk about the Gauge Chart

```react
  <GaugeChart />
```

The Gauge Chart can be used along with the `<Widget />` component

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>
  <GaugeChart value={60} />
</Widget>
```

By default, `maxValue` is `100` but we can change with so it works with bigger values

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>
  <GaugeChart value={153} maxValue={200} />
</Widget>
```

We can also add a label to describe the value of the chart

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>
  <GaugeChart value={33} label="Some label" />
</Widget>
```

### Props

#### **value** (number)

Value that will be shown in the widget.

#### **maxValue** (number)

Maximum value used to calculate the percentage of the current value.

#### **label** (string)

Label for the current value
