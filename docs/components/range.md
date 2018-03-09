A React component that allows users to input numeric values within a range by dragging its sliders.

```react
<Range />
```

### Props

#### **maxValue** (number)

The top limit of the range. You cannot drag your slider beyond this value. By default the value is 10.

```react
<Range maxValue={20}/>
```

#### **minValue** (number)

The bottom limit of the range. You cannot drag your slider under this value. By default the value is 0.

```react
<Range minValue={10} maxValue={30}/>
```

#### **value** (number)

The initial value. By default the value is 0 or the minValue.

```react
<Range value={20} minValue={10} maxValue={30}/>
```

#### **disabled** (boolean)

To get the component disabled.

```react
<Range
  disabled
  value={20}
  minValue={10}
  maxValue={30}/>
```

#### **name** (string)

In order to make the component accesible, it creates hidden inputs underneath when you pass a `name` property.

```react
<Range
  name='wadus'
  value={20}
  minValue={10}
  maxValue={30}/>
```

#### **onChangeStart** (function)

Callback when the user **starts** dragging a slider. The callback accepts the value as parameter.

```react
<Range
  onChangeStart={(value) => console.log('start', value)}
  value={20}
  minValue={10}
  maxValue={30}/>
```

#### **onChange** (function)

Callback when the user **is** dragging a slider. The callback accepts the value as parameter.

```react
<Range
  onChange={(value) => console.log('change', value)}
  value={20}
  minValue={10}
  maxValue={30}/>
```

#### **onChangeComplete** (function)

Callback when the user **ends** dragging a slider. The callback accepts the value as parameter.

```react
<Range
  onChangeComplete={(value) => console.log('complete', value)}
  value={20}
  minValue={10}
  maxValue={30}/>
```

#### **step** (number)

The default increment/decrement of your component is 1. You can change that by setting a different number to this property.

```react
<Range
  step={0.5}
  value={20}
  minValue={10}
  maxValue={30}/>
```

#### **formatLabel** (number)

By default, value labels are displayed as plain numbers. If you want to change the display, you can do so by passing in a function.

```react
<Range
  value={{ min: 2, max: 10 }}
  formatLabel={(value) => `${value}cm`}/>
```

#### **width** (number)

The width of your component. By default is 220 pixels.

```react
<Range
  width={300}
  value={20}
  minValue={10}
  maxValue={30}/>
```
