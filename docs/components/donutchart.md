Talk about the Donut Chart

```react
  <DonutChart data={data} />
```

The Donut Chart can be used along with the `<Widget />` component

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>

  <DonutChart data={data} />
</Widget>
```

### Props

#### **data** (array)

Value that will be shown in the widget.

#### **colors** (array)

Array of colors used to build the donut chart.

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>

  <DonutChart data={data} colors={['#AAABD3', '#CBA6C3', '#9DC3C1', '#353866', '#D9D4CF']} />
</Widget>
```

#### **showLegend** (boolean)

Defaults to `true`. It shows/hides the legend.

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>

  <DonutChart data={data} showLegend={false} />
</Widget>
```
