const map = L.map('map').setView([30, 0], 3);
map.scrollWheelZoom.disable();

L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
  maxZoom: 18
}).addTo(map);

const client = new carto.Client({
  apiKey: 'default_public',
  username: 'cartojs-test'
});

const source = new carto.source.Dataset('ne_10m_populated_places_simple');
const style = new carto.style.CartoCSS(`
        #layer {
          marker-width: 7;
          marker-fill: #EE4D5A;
          marker-line-color: #FFFFFF;
        }
      `);
const layer = new carto.layer.Layer(source, style);

client.addLayer(layer);
client.getLeafletLayer().addTo(map);
