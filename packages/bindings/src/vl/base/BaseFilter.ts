import mitt from 'mitt';

export abstract class BaseFilter {
  protected _emitter: mitt.Emitter;

  constructor() {
    this._emitter = new mitt();
  }

  public abstract getFilter();

  protected _filterChanged() {
    this._emitter.emit('filterChanged');
  }
}
