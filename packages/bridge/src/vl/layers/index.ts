import { select } from "../../util/Utils";

export default class Layers {
  private _layersSelector: any;
  private _carto: any;
  private _layersInfo: Array<any>;
  private _mapLayers: Array<any>;

  constructor(layersSelector: any | string, carto: any, layersInfo: Array<any>, mapLayers: Array<any>) {
    this._layersSelector = select(layersSelector) as any;
    this._carto = carto;
    this._layersInfo = layersInfo;
    this._mapLayers = mapLayers;
  };

  public build () {
    this._carto.on('loaded', this._mapLayers, () => {
      this._layersSelector.layers = this._mapLayers;
      this._layersSelector.layersInfo = this._layersInfo;

      this._layersSelector.forceUpdate();
      this._layersSelector.addEventListener('onToggleLayer', (evt) => {
        const layer = this._mapLayers[evt.detail.index];
        const toggle = layer.visible ? 'hide' : 'show';

        layer[toggle]();
      });
    })
  }
}
