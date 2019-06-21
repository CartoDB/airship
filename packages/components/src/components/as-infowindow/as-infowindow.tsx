import { Component, h, Element, Prop, } from '@stencil/core';

@Component({
  shadow: false,
  styleUrl: './as-infowindow.scss',
  tag: 'as-infowindow',
})

export class Infowindow {

  @Prop() public src: string;
  @Element() private element: HTMLElement;

  public render() {
    return !this.element.innerHTML && this.src
      ? this._renderImageInfoWindow()
      : this._renderStandarInfowindow();
  }

  public componentDidLoad() {
    if (this.src) {
      this._setupHook();
    }
  }

  private _renderStandarInfowindow() {
    return (
      <div class='as-infowindow'>
        {this.src && <img src={this.src} />}
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
          <img src={this.src} />
        </div>
        <div class='as-infowindow__imageHook'>
          <div class='as-infowindow__imageHook--inner'>
            <img src={this.src} />
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
