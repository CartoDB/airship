Talk about the Histogram

```react
  <StackedBar
    data={data}
    keys={['private_rooms', 'shared_rooms', 'entire_homes']}
  />
```

The Histogram can be used along with the `<Widget />` component

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

Value that will be shown in the widget.

#### **keys** (array)

Keys to be used in each bar.

#### **color** (array)

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
