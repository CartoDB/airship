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
  { start: 0, end: 10, value: 63 },
  { start: 10, end: 20, value: 59 },
  { start: 20, end: 30, value: 0 },
  { start: 40, end: 40, value: 23 }
]
```

Bins must be consecutive, adjacent, complete and of equal size to provide a meaningful representation:

- Consecutive: bin order must respect data order. `bin[0]` should start before `bin[1]` and so on.
- Adjacent: leave no gaps. `end` property of a bin must be equal to `start` property of the next bin.
- Complete: if a bin doesn't have any value, it must be provided anyway with the proper start and end properties and a value of 0
- Equal size: bins interval must be of equal size. That is, `end` - `start` of each bin should be equal.

#### **color** (array)

Colors used in the histogram bars.

```react
<Widget>
  <Widget.Title>Title</Widget.Title>
  <Widget.Description>Description</Widget.Description>

  <Histogram data={data} color="#FABADA" />
</Widget>
```
