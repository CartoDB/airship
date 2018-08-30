
# Positioning

`.as-row` class helps you to position elements in a single row. This helps you to layout content very easily and be sure it will look great.

`.as-row` applies the `align-items` and `justify-content` flex rules to make the child nodes centered vertically and separated horizontally.


```html
<div class="as-row as-color--type-04 as-p--12 as-bg--complementary">
  <p class="as-subheader as-m--0">Aligned to the left</p>
  <p class="as-subheader as-m--0">Aligned to the right</p>
</div>
```

### How to use
In this example you can see 3 different ways of using this class:
- The first one (header) with two elements, one to the left and one to the right
- The seond one (content) with three elements, two to the left and one to the right
- The third one (footer) with three elements, one to the left, one centered and one to the right

```html
<div class="as-bg--ui-01 as-px--24 as-py--16">
  <header class="as-row as-mb--24">
    <h1 class="as-title as-color--type-01 as-m--0">Sales in 2018</h1>
    <span>
      <i class="as-icon-arrow-right as-color--primary"></i>
    </span>
  </header>

  <div class="as-row as-py--8">
    <div>
      <span class="as-badge as-mr--8">1</span>
      <span class="as-subheader as-color--type-02 as-m--0">Cras a ante ac neque dapibus mattis</span>
    </div>
    <div class="as-subheader as-color--type-01">$1,000</div>
  </div>
  <div class="as-row as-py--8">
    <div>
      <span class="as-badge as-bg--badge-pink as-mr--8">2</span>
      <span class="as-subheader as-color--type-02 as-m--0">Integer et pharetra nulla</span>
    </div>
    <div class="as-subheader as-color--type-01">$2,230</div>
  </div>
  <div class="as-row as-py--8">
    <div>
      <span class="as-badge as-mr--8">3</span>
      <span class="as-subheader as-color--type-02 as-m--0">In ultricies risus id lacus pretium ultricies</span>
    </div>
    <div class="as-subheader as-color--type-01">$3,780</div>
  </div>
  <div class="as-row as-py--8">
    <div>
      <span class="as-badge as-bg--badge-pink as-mr--8">4</span>
      <span class="as-subheader as-color--type-02 as-m--0">Mauris condimentum orci</span>
    </div>
    <div class="as-subheader as-color--type-01">$3,492</div>
  </div>
  <div class="as-row as-py--8">
    <div>
      <span class="as-badge as-mr--8">5</span>
      <span class="as-subheader as-color--type-02 as-m--0">Nam in ligula elementum</span>
    </div>
    <div class="as-subheader as-color--type-01">$1,230</div>
  </div>

  <footer class="as-row as-mt--28">
    <span class="as-body as-color--primary">
      <i class="as-icon-arrow-left as-mr--4"></i>
      Previous
    </span>
    <span class="as-body as-color--type-02">Page 1 of 13</span>
    <span class="as-body as-color--primary">
      Next
      <i class="as-icon-arrow-right as-ml--4"></i>
    </span>
  </footer>
</div>
```

I you need a different or more sophisticated positioning check out our [flex utilities](/catalog/#/styles/utilities?a=flex-utilities).
