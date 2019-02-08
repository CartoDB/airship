import { HistogramSelection } from '../../../../components/src/components/as-histogram-widget/interfaces';
import { isCategoricalHistogramEqual } from '../utils/comparison/histogram';
import * as conversion from '../utils/conversion/histogram';
import { BaseHistogramFilter } from './BaseHistogramFilter';

export class CategoricalHistogramFilter extends BaseHistogramFilter<string[]> {
  private _lastHistogram: VLCategoricalHistogram = null;

  constructor(
    carto: any,
    layer: any,
    histogram: HTMLAsTimeSeriesWidgetElement | HTMLAsHistogramWidgetElement,
    columnName: string,
    source: any,
    readOnly: boolean = true
  ) {
    super('categorical', carto, layer, histogram, columnName, source, readOnly);
  }

  public get filter(): string {
    if (this._selection === null) {
      return null;
    } else {
      return `$${this._column} in [${this._selection.map((value) => `'${value}'`).join(',')}]`;
    }
  }

  public get expression(): any {
    const s = this._carto.expressions;
    return s.viewportHistogram(s.prop(this._column));
  }

  protected bindDataLayer()  {
    this._dataLayer.on('updated', () => {
      const newHistogram = (this._dataLayer.viz.variables[this.name] as VLCategoricalHistogram);
      if (!newHistogram) {
        return;
      }

      if (this._lastHistogram === null || !isCategoricalHistogramEqual(this._lastHistogram, newHistogram)) {
        this._lastHistogram = { value: newHistogram.value };

        this._widget.data = conversion.categorical(newHistogram, this._legendData);
      }
    });
  }

  protected selectionChanged(evt: CustomEvent<HistogramSelection>) {
    if (evt.detail === null) {
      this._selection = null;
    } else {
      const selection = evt.detail.selection as string[];
      this._selection = selection.map((value) => value);
    }

    this._filterChanged();
  }

}
