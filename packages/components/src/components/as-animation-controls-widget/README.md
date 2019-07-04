Animation Controls Widget allows you to visualize and control an animated visualization.

```html
noSource: true
---
<iframe src="/examples/components/as-animation-controls-widget/simple.html" style="width: 100%; height: 300px;">
```

[See example](/developers/airship/examples/#example-as-animation-controls-simple)

### CSS Variables

```
as-animation-controls-widget {
  --as--animation-controls-widget--background-color
  --as--animation-controls__progress-value--color
}
```

### Props

#### **progress**: number = 0

Animation pogress in %

#### **progressValue**: number | string

Animation progress value. If the input type is Date or TimeZoneDate, it returns a string with the date in ISO string format

#### **min**: number = 0

Min value in seconds

#### **max**: number = 100

Min value in seconds

#### **duration**: number = 0

The duration of the animation in seconds

#### **showThumb**: boolean = true

If set to `false`, does not display the range slider thumb and, therefore, the user can not interact with the progress bar

#### **showThumbCaption**: boolean = false

If set to `true`, it displays the current progress value below the range slider thumb

#### **playing**: boolean = false

Let you know if the animation is playing

#### **heading**: string

Heading of the widget to be displayed

#### **description**: string

Description of the widget to be displayed

#### **showHeader**: string

Toggles displaying title and description

#### **noDataHeaderMessage**: string = 'NO DATA AVAILABLE'

Message shown in header when no data is available

#### **noDataBodyMessage**: string = 'There is no data to display.';

* Message shown in body when no data is available

#### **error**: string = ''

Use this widget to put the widget in "error mode". When error mode is active, the header will display the given text, and the body will be display the errorDescription instead any data.

#### errorDescription: string = ''

Extended error description, only shown when error is present

### Events

#### **seek**

Triggered when the range bar thumb changes.

```code
lang: javascript
---

const animationControls = document.querySelector('as-animation-controls-widget');
animationControls.addEventListener('seek', event => {
  console.log('Seek animation to: ', event.detail)
});
```

#### **play**

Triggered when the user clicks on the play button.

```code
lang: javascript
---
const animationControls = document.querySelector('as-animation-controls-widget');
animationControls.addEventListener('play', event => {
  // Start playing the animation
});
```

#### **pause**

Triggered when the user clicks on the pause button.

```code
lang: javascript
---
const animationControls = document.querySelector('as-animation-controls-widget');
animationControls.addEventListener('pause', event => {
  // Pause the animation
});
```