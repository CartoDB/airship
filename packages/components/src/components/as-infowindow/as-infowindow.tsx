import { Component, Element, h, Prop, } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-infowindow.scss',
  tag: 'as-infowindow',
})

export class Infowindow {

  @Prop() public src: string;

  /**
   * Width of the content. This should be a valid
   * width CSS value.
   *
   * @type {string}
   * @memberof Infowindow
   */
  @Prop() public width: string;

  @Element() private element: HTMLElement;

  public render() {
    const styleWidth = this.width
      ? { width: this.width }
      : undefined;

    return this.element.childElementCount === 0 && this.src
      ? this._renderImageInfoWindow(styleWidth)
      : this._renderStandarInfowindow(styleWidth);
  }

  public componentDidLoad() {
    if (this.src) {
      this._setupHook();
    }
  }

  private _renderStandarInfowindow(style = {}) {
    return (
      <div class='as-infowindow' style={style}>
        {this.src && <img src={this.src} />}
        <div class='as-infowindow__content'>
          <slot />
        </div>
        <div class='as-infowindow__hook'></div>
      </div>
    );
  }

  private _renderImageInfoWindow(style = {}) {
    return (
      <div class='as-infowindow' style={style}>
        <div class='as-infowindow__media'>
          <img src={this.src} />
        </div>
        <div class='as-infowindow__imageHook'>
          <div class='as-infowindow__imageHook--inner'>
            <img src={this.src} style={style} />
          </div>
        </div>
      </div>
    );
  }

  private _setupHook() {
    const imageElement = this.element.querySelector('.as-infowindow__media img') as HTMLImageElement;

    if (!imageElement) {
      return;
    }

    imageElement.onload = () => {
      const imageHeight = imageElement.offsetHeight;

      const media = this.element.querySelector('.as-infowindow__media') as HTMLDivElement;
      const hook = this.element.querySelector('.as-infowindow__imageHook img') as HTMLDivElement;

      const offset = imageHeight - 18;

      media.style.height = `${offset}px`;
      hook.style.marginTop = `-${offset}px`;
    };
  }
}
