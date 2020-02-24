import { select } from '../../util/Utils';

export default class Layers {
  private _layersSelector: any;
  private _carto: any;
  private _layers: any[];
  private _mapLayers: any[];

  constructor(layersSelector: any | string, carto: any, layers: any[], mapLayers: any[]) {
    this._layersSelector = select(layersSelector) as any;
    this._carto = carto;
    this._layers = layers;
    this._mapLayers = mapLayers;
  }

  public build() {
    this._carto.on('loaded', this._mapLayers, () => {
      this._layersSelector.layers = this._layers;
      this._layersSelector.forceUpdate();
      this._layersSelector.addEventListener('onToggleLayer', (evt) => {
        const layer = this._mapLayers[evt.detail.index];
        const toggle = layer.visible ? 'hide' : 'show';

        layer[toggle]();
      });
    });
  }
}
