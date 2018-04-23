Talk about the Donut Chart

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>

  <DonutChart data={data} />
</Widget>
```

### Props

#### **data** (array)

Value that will be shown in the widget. Each object should include a `name` and a `value`. For example:

```
[
  { name: 'A New Hope', value: 359029623 },
  { name: 'The Empire Strikes Back', value: 236513856 },
  { name: 'Return of the Jedi', value: 204338075 },
]
```

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
