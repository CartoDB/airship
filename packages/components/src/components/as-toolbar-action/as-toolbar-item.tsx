
import { Component, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-toolbar-item.scss',
  tag: 'as-toolbar-item',
})

export class ToolbarItem {
  @Prop() public text: string;
  @Prop() public src: string;

  public render() {
    return (
      <span class='as-toolbar-main__item'>
        <img src={this.src} alt={this.text} />
        <p>{this.text}</p>
      </span>
    );
  }
}
