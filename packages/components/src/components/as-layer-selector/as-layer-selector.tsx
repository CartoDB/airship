import { Component, h, Prop, Event, EventEmitter, } from '@stencil/core';

/**
 * Category Widget
 *
 * @export
 * @class LayerSelector
 */
@Component({
  shadow: false,
  styleUrl: './as-layer-selector.scss',
  tag: 'as-layer-selector'
})
export class LayerSelector {
  @Prop() public layers: Array<string> = [];

  /**
   * This method proxies the toggleLayer event
   */
  @Event()
  private toggleLayer: EventEmitter;

  private _onToggleLayer(index: string, event: any) {
    this.toggleLayer.emit({ event, index });
  }

  public render() {
    return this.layers.map(this._renderCheckbox.bind(this));
  }

  protected _renderCheckbox(layer, index) {
    return (
      <div class='as-checkbox'>
        <input
          class='as-checkbox-input'
          type='checkbox'
          id={`checkbox-${index}`}
          name={layer.id}
          value={layer.id}
          onChange={this._onToggleLayer.bind(this, index)}
          checked />
          <span class='as-checkbox-decoration'>
          <svg class='as-checkbox-media'>
            <polyline
              class='as-checkbox-check'
              points='1.65093994 3.80255127 4.48919678 6.97192383 10.3794556 0.717346191'>
            </polyline>
          </svg>
        </span>
      <label class='as-caption' htmlFor={`checkbox-${index}`}>{layer.id}</label>
      </div>
    );
  }
}
