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

Value that will be shown in the widget. Each bin should include `start`, `end` and `value` keys. For example:

```
[
  { start: 8, end: 48, value: 6318 },
  { start: 49, end: 88, value: 5922 },
  { start: 89, end: 128, value: 2363 },
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
