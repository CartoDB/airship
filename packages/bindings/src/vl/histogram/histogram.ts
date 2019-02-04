import mitt from 'mitt';
import { HistogramSelection } from '../../../../components/src/components/as-histogram-widget/interfaces';
import { BaseFilter } from '../base/BaseFilter';

export abstract class Histogram<T> extends BaseFilter {
  protected _buckets: number;
  protected _carto: any;
  protected _widget: HTMLAsTimeSeriesWidgetElement | HTMLAsHistogramWidgetElement;
  protected _selection: T = null;
  protected _dataLayer: any;

  constructor(
    type: 'categorical' | 'numerical',
    carto: any,
    layer: any,
    histogram: HTMLAsTimeSeriesWidgetElement | HTMLAsHistogramWidgetElement,
    columnName: string,
    source: any,
    readOnly: boolean = true
  ) {
    super(`histogram_${type}`, columnName, layer, source, readOnly);

    this._widget = histogram;
    this._carto = carto;

    histogram.disableInteractivity = readOnly;
    histogram.showClear = !readOnly;

    this.selectionChanged = this.selectionChanged.bind(this);

    if (!readOnly) {
      this._widget.addEventListener('selectionChanged', this.selectionChanged);
    }
  }

  public setLayer(layer: any) {
    this._layer = layer;
  }

  public removeHistogramLayer() {
    this._layer.remove();
  }

  public on(type: string, handler: mitt.Handler) {
    this._emitter.on(type, handler);
  }

  public getDataLayer() {
    return this._dataLayer;
  }

  public buildDataLayer(columns: string[]) {
    const carto = this._carto;
    const variables = columns.map((column, i) => `@asbind_${column}_${i}: $${column}`);

    // Create the data layer
    const dataViz = new carto.Viz(`
      ${this.expression}
      ${variables.join('\n')}

      strokeWidth: 0
      color: rgba(255,255,255,0)
    `);

    this._dataLayer = new carto.Layer(this.name, this.source, dataViz);

    this.bindDataLayer();

    return this._dataLayer;
  }

  public setDataLayer(layer: any) {
    this._dataLayer = layer;

    this.bindDataLayer();
  }

  protected abstract selectionChanged(evt: CustomEvent<HistogramSelection>);
  protected abstract bindDataLayer();
}
