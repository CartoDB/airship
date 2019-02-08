import mitt from 'mitt';

export abstract class BaseFilter {
  // Internal counter to prevent colission between filters for the same
  // column and the same type
  private static _counter: number = 0;

  protected _emitter: mitt.Emitter;
  protected _column: string;
  protected _layer: any;
  protected _source: any;
  protected _legendData: LegendEntry[];
  protected _mapColors: boolean;
  protected _widget: HTMLStencilElement;
  private _readOnly: boolean;
  private _name: string;
  private _type: string;

  constructor(type, column, layer, source, readOnly = true) {
    this._emitter = new mitt();

    this._name = `asbind_${type}_${column}_${BaseFilter._counter}`;
    this._column = column;
    this._layer = layer;
    this._source = source;
    this._readOnly = readOnly;
    this._type = type;

    BaseFilter._counter++;

    this._loadLegendData = this._loadLegendData.bind(this);
  }

  public abstract setDataLayer(layer: any);
  public abstract get filter(): string;
  public abstract get expression(): any;

  public get name(): string {
    return this._name;
  }

  public get column(): string {
    return this._column;
  }

  public get type(): string {
    return this._type;
  }

  public get readOnly(): boolean {
    return this._readOnly;
  }

  public get layer(): any {
    return this._layer;
  }

  public get source(): any {
    return this._source;
  }

  public on(type: string, handler: mitt.Handler) {
    this._emitter.on(type, handler);
  }

  public setLegendData(legendData: LegendData) {
    this._legendData = legendData.data;
  }

  public enableColorMapping() {
    this._mapColors = true;

    if (this._layer.viz) {
      this._loadLegendData();
    } else {
      this._layer.on('loaded', this._loadLegendData);
    }
  }

  protected _filterChanged() {
    this._emitter.emit('filterChanged', this._name);
  }

  protected _loadLegendData() {
    const color = this._layer.viz.color;

    if (!color.getLegendData) {
      return;
    }

    this.setLegendData(color.getLegendData(this._getLegendConfig()));
  }

  protected _getLegendConfig() {
    return undefined;
  }

}
