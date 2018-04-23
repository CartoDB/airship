Talk about the Gauge Chart

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>
  <GaugeChart value={60} />
</Widget>
```

### Props

#### **value** (number)

Value that will be shown in the widget.

#### **maxValue** (number)

Maximum value used to calculate the percentage of the current value.
By default is `100`.

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>
  <GaugeChart value={153} maxValue={200} />
</Widget>
```

#### **label** (string)

Label for the current value.

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>
  <GaugeChart value={33} label="Some label" />
</Widget>
```

#### **color** (string)

Overrides the color of the progress bar.

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>
  <GaugeChart value={91} color="#7E78E2" />
</Widget>
```
