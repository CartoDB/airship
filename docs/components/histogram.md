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

Bin data should be provided sorted and complete:

- Sorted: bin order must respect data order. `bin[0]` should start before `bin[1]` and so on
- Complete: if a bin doesn't have any value, it must be provided anyway with the proper start and end properties and a value of 0

#### **color** (array)

Colors used in the histogram bars.

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>

  <Histogram data={data} color="#FABADA" />
</Widget>
```
