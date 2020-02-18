import { select } from "../../util/Utils";

export default class Layers {
  private _carto: any;
  private _layers: Array<any>;
  private _layersSelector: any;

  constructor(layersSelector: any | string, carto: any, layers: Array<any>) {
    this._layersSelector = select(layersSelector) as any;
    this._carto = carto;
    this._layers = layers;
  };

  public build () {
    this._carto.on('loaded', this._layers, () => {
      this._layersSelector.layers = this._layers;
      this._layersSelector.forceUpdate();
      this._layersSelector.addEventListener('toggleLayer', (evt) => {
        const layer = this._layers[evt.detail.index];

        if (layer.visible) {
          layer.hide();
        } else {
          layer.show();
        }
      });
    })
  }
}
