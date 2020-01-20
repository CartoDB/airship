import { Component, h } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-placeholder-list.scss',
  tag: 'as-placeholder-list',
})
export class LoadingBar {
  public render() {
    return [
      this.renderBarSection(),
      this.renderBarSection(),
      this.renderBarSection(),
      this.renderBarSection(),
      this.renderBarSection()
    ];
  }

  public renderBarSection() {
    const barPercentage = Math.trunc(Math.random() * 60) + 40;

    return (
      <div class='placeholder-list__items'>
        <as-placeholder-bar
          class='placeholder-list__item placeholder-list__item--first'
          height='12px'
          width={`${barPercentage}%`}
        ></as-placeholder-bar>

        <as-placeholder-bar class='placeholder-list__item' height='4px' width='100%'></as-placeholder-bar>
      </div>
    );
  }
}
