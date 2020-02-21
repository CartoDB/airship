import { Component, h, Prop, Event, EventEmitter, Listen } from '@stencil/core';

/**
 * Category Widget
 *
 * @export
 * @class LayerSelector
 */
@Component({
  shadow: false,
  tag: 'as-layer-selector'
})
export class LayerSelector {
  @Prop() public mapLayers: Array<string> = [];
  @Prop() public layersInfo: Array<string> = [];

  /**
   * This method proxies the toggleLayer event
   */
  @Event()
  public onToggleLayer: EventEmitter;

  @Listen('onToggleCheckbox')
  protected onToggleCheckbox(evt: any) {
    this.onToggleLayer.emit(evt.detail);
  }

  public render() {
    return (
      <div class='as-layer-selector--wrapper'>
        {this.layersInfo.map(this._renderCheckbox.bind(this))}
      </div>
    );
  }

  private _renderCheckbox(layer, index) {
    return <as-layer-selector-slot
      layer={layer}
      index={index}>
        <slot name={`as-checkbox-layer-${index}-slot`}></slot>
      </as-layer-selector-slot>;
  }
}
