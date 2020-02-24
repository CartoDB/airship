import {
  Component,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop
} from '@stencil/core';

/**
 * Layer Selector
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
  @Prop() public layers: string[] = [];

  /**
   * This method proxies the toggleLayer event
   */
  @Event()
  public onToggleLayer: EventEmitter;

  @Listen('onToggleCheckbox')
  public onToggleCheckbox(evt: any) {
    this.onToggleLayer.emit(evt.detail);
  }

  public render() {
    return (
      <div class='as-layer-selector--wrapper'>
        {this.layers.map(this._renderCheckbox.bind(this))}
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
