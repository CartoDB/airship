import mitt from 'mitt';

export abstract class BaseFilter {
  // Internal counter to prevent colission between filters for the same
  // column and the same type
  private static _counter: number = 0;

  protected _emitter: mitt.Emitter;
  protected _column: string;
  protected _layer: any;
  protected _source: any;
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
  }

  public abstract buildDataLayer(columns: string[]): any;
  public abstract setDataLayer(layer: any);
  public abstract get filter();
  public abstract get expression(): string;

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

  protected _filterChanged() {
    this._emitter.emit('filterChanged', this._name);
  }

}
