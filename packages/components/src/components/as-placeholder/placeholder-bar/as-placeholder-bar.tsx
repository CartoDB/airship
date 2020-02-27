import { Component, h, Host, Prop } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-placeholder-bar.scss',
  tag: 'as-placeholder-bar',
})
export class PlaceholderBar {
  @Prop() public width: string;
  @Prop() public height: string;

  public render() {
    const styles = {
      height: this.height,
      width: this.width
    };

    return (
      <Host style={styles}>
        <div class='placeholder-bar'></div>
      </Host>
    );
  }
}
