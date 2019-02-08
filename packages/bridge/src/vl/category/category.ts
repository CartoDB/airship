import { BaseFilter } from '../base/BaseFilter';
import { isCategoricalHistogramEqual } from '../utils/comparison/histogram';
import vlToCategory from '../utils/conversion/category';

export class Category extends BaseFilter {
  protected _widget: HTMLAsCategoryWidgetElement;
  private _carto: any;
  private _selection: string[] = [];
  private _lastHistogram: VLCategoricalHistogram = null;
  private _dataLayer: any;

  constructor(
    carto: any,
    layer: any,
    widget: HTMLAsCategoryWidgetElement,
    columnName: string,
    source: any,
    readOnly: boolean = true
  ) {
    super(`category`, columnName, layer, source, readOnly);

    this._widget = widget;
    this._carto = carto;

    widget.disableInteractivity = readOnly;
    widget.showClearButton = !readOnly;

    this.selectionChanged = this.selectionChanged.bind(this);

    if (!readOnly) {
      this._widget.addEventListener('categoriesSelected', this.selectionChanged);
    }
  }

  public setLayer(layer: any) {
    this._layer = layer;
  }

  public getDataLayer() {
    return this._dataLayer;
  }

  public setDataLayer(layer: any) {
    this._dataLayer = layer;

    this._dataLayer.on('updated', () => {
      const newHistogram = (this._dataLayer.viz.variables[this.name] as VLCategoricalHistogram);
      if (!newHistogram) {
        return;
      }

      if (this._lastHistogram === null || !isCategoricalHistogramEqual(this._lastHistogram, newHistogram)) {
        this._lastHistogram = { value: newHistogram.value };

        this._widget.categories = vlToCategory(newHistogram, this._legendData);
      }
    });
  }

  public get filter(): string {
    if (this._selection.length === 0) {
      return null;
    } else {
      return `$${this._column} in [${this._selection.map((value) => `'${value}'`).join(',')}]`;
    }
  }

  public get expression(): any {
    const s = this._carto.expressions;
    return s.viewportHistogram(s.prop(this._column));
  }

  private selectionChanged(evt: CustomEvent) {
    this._selection = evt.detail;

    this._filterChanged();
  }
}
