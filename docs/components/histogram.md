Talk about the Histogram

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>

  <Histogram data={data} />
</Widget>
```

### Props

#### **data** (array)

Value that will be shown in the widget. Each category should include a `name` and a `value`. For example:

```
[
  { name: 'A New Hope', value: 359029623 },
  { name: 'The Empire Strikes Back', value: 236513856 },
  { name: 'Return of the Jedi', value: 204338075 },
]
```

#### **color** (array)

Colors used in the histogram bars.

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>

  <Histogram data={data} color="#FABADA" />
</Widget>
```
