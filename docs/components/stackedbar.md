Talk about the Histogram

```react
<Widget>
  <Widget.Title>Suffer score</Widget.Title>
  <Widget.Description>Just a widget</Widget.Description>

  <StackedBar
    data={data}
    keys={['private_rooms', 'shared_rooms', 'entire_homes']}
  />
</Widget>
```

### Props

#### **data** (array)

Value that will be shown in the widget. Each object should include a name, and the keys we want to show:

```
[
  { name: 'A New Hope', investment: 204338075, revenue: 359029623,  },
  { name: 'The Empire Strikes Back', investment: 359029623, revenue: 236513856,  },
  { name: 'Return of the Jedi', investment: 236513856, revenue: 204338075,  },
]
```

#### **keys** (array)

Keys to be used in each bar, with the data above we would use `['investment', 'revenue']` as keys.

#### **labels** (array)

Labels to show in the legend, it's a match 1 to 1 to the keys:

```react
<Widget>
  <Widget.Title>Suffer score</Widget.Title>
  <Widget.Description>Just a widget</Widget.Description>

  <StackedBar
    data={data}
    keys={['private_rooms', 'shared_rooms', 'entire_homes']}
    labels={['Private rooms', 'Shared rooms', 'Entire home/apt']}
  />
</Widget>
```

#### **colors** (array)

Colors used in the chart.

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>

  <StackedBar
    data={data}
    colors={['#AAABD3', '#CBA6C3', '#9DC3C1']}
    keys={['private_rooms', 'shared_rooms', 'entire_homes']}
  />
</Widget>
```

#### **showLegend** (bool)

Defaults to `true`. It shows/hides the legend.
