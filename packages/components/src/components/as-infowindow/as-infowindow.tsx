import { Component, Element, Prop, } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-infowindow.scss',
  tag: 'as-infowindow',
})

export class Infowindow {

  @Prop() public src: string;
  @Element() private element: HTMLElement;

  public render() {
    if (this.src) {
      return this._renderImageInfoWindow();
    }
    return this._renderStandarInfowindow();
  }

  public componentDidLoad() {
    if (this.src) {
      this._setupHook();
    }
  }

  private _renderStandarInfowindow() {
    return (
      <div class='as-infowindow'>
        <div class='as-infowindow__content'>
          <slot />
        </div>
        <div class='as-infowindow__hook'></div>
      </div>
    );
  }

  private _renderImageInfoWindow() {
    return (
      <div class='as-infowindow'>
        <div class='as-infowindow__media'>
          <img src={this.src} class='as-infowindow-media-item' />
        </div>
        <div class='as-infowindow__hook--img'>
          <img src={this.src} />
        </div>
      </div>
    );
  }

  private _setupHook() {
    const imageElement = this.element.querySelector('.as-infowindow__media img') as HTMLImageElement;
    imageElement.onload = () => {
      const imageHeight = imageElement.height;

      const imageWidth = imageElement.width;
      const ratio = (imageHeight / imageWidth) * 20;

      const media = this.element.querySelector('.as-infowindow__media') as HTMLDivElement;
      const hook = this.element.querySelector('.as-infowindow__hook--img') as HTMLDivElement;


      const newHeight = imageHeight - 10;
      media.style.height = `${newHeight}px`;


      hook.style.clipPath = this._computeClipPath(ratio);
    };

  }

  /**
   * Compute the hook form factor depending on the aspect ratio of the image.
   * (Values are totally empirical)
   */
  private _computeClipPath(ratio: number): string {
    if (ratio < 10) {
      return 'polygon(0 0, 0% 100%, 40% 0%)';
    }

    if (ratio < 30) {
      return 'polygon(0 0, 0% 100%, 100% 0%)';
    }

    return 'polygon(0 0, 0% 100%, 100% 60%)';


  }
}
