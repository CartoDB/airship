import { Component, Element, Prop, } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-infowindow.scss',
  tag: 'as-infowindow',
})

export class Switch {

  @Prop() public src: string;
  @Element() private element: HTMLElement;

  public render() {
    return (
      <div class='as-infowindow'>
        <div class='as-infowindow__media'>
          <img src={this.src} class='as-infowindow-media-item' />
        </div>
        <div class='as-infowindow__hook'>
          <img src={this.src} />
        </div>
      </div>
    );
  }

  public componentDidLoad() {
    this._setupHook();
  }


  private _setupHook() {
    const imageElement = this.element.querySelector('.as-infowindow__media img') as HTMLImageElement;
    imageElement.onload = () => {
      const imageHeight = imageElement.height;

      const imageWrapper = this.element.querySelector('.as-infowindow__media') as HTMLDivElement;

      const newHeight = imageHeight - 10;
      imageWrapper.style.height = `${newHeight}px`;
    };

  }
}
