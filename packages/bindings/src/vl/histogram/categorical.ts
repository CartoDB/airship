import { HistogramSelection } from '../../../../components/src/components/as-histogram-widget/interfaces';
import { isCategoricalHistogramEqual } from '../utils/comparison/histogram/histogram';
import * as conversion from '../utils/conversion/histogram/histogram';
import { Histogram } from './histogram';


export class CategoricalHistogram extends Histogram<string[]> {
  private _lastHistogram: VLCategoricalHistogram = null;

  public get expression(): string {
    return `@${this.name}: viewportHistogram($${this._column})`;
  }

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

  protected bindDataLayer()  {
    this._dataLayer.on('updated', () => {
      const newHistogram = (this._dataLayer.viz.variables[this.name] as VLCategoricalHistogram);
      if (!newHistogram) {
        return;
      }

      if (this._lastHistogram === null || !isCategoricalHistogramEqual(this._lastHistogram, newHistogram)) {
        this._lastHistogram = newHistogram;

        this._widget.data = conversion.categorical(newHistogram);
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
