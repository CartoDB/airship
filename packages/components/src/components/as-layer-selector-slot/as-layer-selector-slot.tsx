import {
  Component,
  Event,
  EventEmitter,
  h,
  Prop,
  State
} from '@stencil/core';

/**
 * Layer Selector Slot
 *
 * @export
 * @class LayerSelectorSlot
 */
@Component({
  shadow: false,
  styleUrl: './as-layer-selector-slot.scss',
  tag: 'as-layer-selector-slot'
})
export class LayerSelectorSlot {
  @Prop() public layer: any;
  @Prop() public index: number;
  @State() public visible: boolean = true;

  /**
   * This method proxies the toggleLayer event
   */
  @Event()
  public onToggleCheckbox: EventEmitter;

  public toggleCheckbox() {
    this.visible = !this.visible;
  }

  public render() {
    return (
      <div class='as-layer-selector-slot--wrapper'>
        <div class='as-checkbox'>
          <input
            class='as-checkbox-input'
            type='checkbox'
            id={`checkbox-${this.index}`}
            name={`layer-${this.layer.id}`}
            value={`layer-${this.layer.id}`}
            onChange={this._onChange.bind(this, this.index)}
            checked />
            <span class='as-checkbox-decoration'>
            <svg class='as-checkbox-media'>
              <polyline
                class='as-checkbox-check'
                points='1.65093994 3.80255127 4.48919678 6.97192383 10.3794556 0.717346191'>
              </polyline>
            </svg>
          </span>
          <label class='as-caption' htmlFor={`checkbox-${this.index}`}>{this.layer.title}</label>
        </div>
        <div class={`as-checkbox-layer-slot ${this.visible ? 'as-checkbox-layer-slot--visible' : 'as-checkbox-layer-slot--hidden'}`}>
          <slot name={`as-checkbox-layer-${this.index}-slot`}></slot>
        </div>
      </div>
    );
  }

  private _onChange(index: string, event: any) {
    this.toggleCheckbox();
    this.onToggleCheckbox.emit({ event, index });
  }
}
