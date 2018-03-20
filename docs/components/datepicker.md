Date picker component for filtering data by dates.

```react
<Datepicker
  fromMonth={new Date(2018, 8)}
  toMonth={new Date(2020, 11)}
/>
```

### Props

#### **fromMonth** (date required)

The first allowed month. Users won’t be able to navigate or interact with the days before it.

#### **toMonth** (date required)

The last allowed month. Users won’t be able to navigate or interact with the days after it

#### **initialMonth** (date)

The month to display in the calendar at first render.

```react
<Datepicker
  initialMonth={new Date(2018, 9)}
  fromMonth={new Date(2018, 8)}
  toMonth={new Date(2020, 11)}
/>
```

#### **disabledDays** (array)

Day(s) that should appear as disabled. The array accepts what we call `modifiers`.
A modifier can be either:

* a Date object, to match a specific day

```react
<Datepicker
  fromMonth={new Date(2018, 8)}
  toMonth={new Date(2020, 11)}
  disabledDays={[
    new Date(2018, 8, 12)
  ]}
/>
```

* a range object with `from` and `to` keys to match a range of days:

```react
<Datepicker
  fromMonth={new Date(2018, 8)}
  toMonth={new Date(2020, 11)}
  disabledDays={[
    { from: new Date(2018, 8, 20), to: new Date(2018, 8, 25) }
  ]}
/>
```

* an object with a `before` and/or `after` key to match the days before and/or after the given date:

```react
<Datepicker
  fromMonth={new Date(2018, 8)}
  toMonth={new Date(2020, 11)}
  disabledDays={[
    { after: new Date(2018, 8, 20), before: new Date(2018, 8, 25) }
  ]}
/>
```

* a function taking the day as first argument and returning a boolean value:

```react
<Datepicker
  fromMonth={new Date(2018, 8)}
  toMonth={new Date(2020, 11)}
  disabledDays={[
    (day) => {
      return day.getDay() === 0;
    }
  ]}
/>
```

* any combination of above:

```react
<Datepicker
  fromMonth={new Date(2018, 8)}
  toMonth={new Date(2020, 11)}
  disabledDays={[
    new Date(2018, 8, 12),
    new Date(2018, 8, 17),
    { after: new Date(2018, 8, 20), before: new Date(2018, 8, 25) },
    (day) => {
      return day.getDay() === 3;
    }
  ]}
/>
```
