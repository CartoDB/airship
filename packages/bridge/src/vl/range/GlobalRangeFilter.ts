import { BaseFilter } from '../base/BaseFilter';

/**
 * Class that binds a CARTO VL between filter to an Airship range slider widget
 *
 * @export
 * @class GlobalRangeFilter
 * @extends {BaseFilter}
 */
export class GlobalRangeFilter extends BaseFilter {
  protected _widget: HTMLAsRangeSliderElement;
  private _carto: any;
  private _dataLayer: any;
  private _populated: boolean;
  private _value: [number, number] = null;

  constructor(
    carto: any,
    layer: any,
    widget: HTMLAsRangeSliderElement,
    columnName: string,
    source: any
  ) {
    super(`category`, columnName, layer, source, false);

    this._widget = widget;
    this._carto = carto;

    this._widget.addEventListener('change', (event: CustomEvent) => {
      this._value = event.detail;
      this._filterChanged();
    });
  }

  public setDataLayer(layer: any) {
    this._dataLayer = layer;

    this._dataLayer.on('updated', () => {
      const data = this._dataLayer.viz.variables[this.name];

      if (data && !this._populated) {
        this._widget.minValue = data.value[0];
        this._widget.maxValue = data.value[1];
        this._widget.range = data.value;

        this._populated = true;
      }
    });
  }

  public get filter(): string {
    if (this._value === null) {
      return null
    } else {
      return `$${this.column} > ${this._value[0]} and $${this.column} < ${this._value[1]}`;
    }
  }

  public get expression(): any {
    const s = this._carto.expressions;
    return s.list([s.globalMin(s.prop(this._column)), s.globalMax(s.prop(this._column))])
  }
}
