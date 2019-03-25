import '@carto/airship-components';
import '@carto/airship-icons';
import '@carto/airship-style';
import { VLBridge } from '@carto/airship-bridge';
import { defineCustomElements } from '@carto/airship-components/dist/loader'

defineCustomElements(window);

function onReady () {
  const map = new mapboxgl.Map({
    container: 'map',
    style: carto.basemaps.darkmatter,
    center: [-4.77, 37.88],
    zoom: 4
  });

  carto.setDefaultAuth({
    username: 'roman-carto',
    apiKey: 'default_public'
  });

  const source = new carto.source.SQL(`select *, ST_X(the_geom) as lon from ne_10m_airports`);
  const viz = new carto.Viz(`
    strokeWidth: 0
    color: ramp($location, vivid)
  `);

  const layer = new carto.Layer('layer', source, viz);
  layer.addTo(map, 'watername_ocean');

  var stackedData = [{
      category: 'Star Wars Ep. IV: A New Hope',
      values: {
        dvd: 27229125,
        blue: 3555058,
      }
    },
    {
      category: 'Star Wars Ep. V: The Empire Strikes Back',
      values: {
        dvd: 24928640,
        blue: 2738207,
      },
    },
    {
      category: 'Star Wars Ep. VI: Return of the Jedi',
      values: {
        dvd: 23786454,
        blue: 1908593,
      }
    }
  ];

  var stackedMetadata = {
    dvd: {
      label: 'Domestic DVD Sales',
      color: '#33ACEE'
    },
    blue: {
      label: 'Domestic Blu-ray Sales',
      color: '#EEC649'
    }
  }

  const stackedFooter = document.getElementById('stackedFooter');
  const stackedSidebar = document.getElementById('stackedSidebar');
  const category = document.getElementById('typeCat');
  stackedFooter.data = stackedData;
  stackedFooter.metadata = stackedMetadata;
  stackedSidebar.data = stackedData;
  stackedSidebar.metadata = stackedMetadata;

  var histogramData =  [{
      start: 0,
      end: 10,
      value: 5
    },
    {
      start: 10,
      end: 20,
      value: 10
    },
    {
      start: 20,
      end: 30,
      value: 15
    },
    {
      start: 30,
      end: 40,
      value: 20
    },
    {
      start: 40,
      end: 50,
      value: 30
    },
  ];

  var histogramFooter = document.getElementById('histogramFooter');
  var histogramSidebar = document.getElementById('histogramSidebar');
  histogramFooter.data = histogramData;
  histogramSidebar.data = histogramData;

  const bridge = new VLBridge({ carto, map, layer, source });

  bridge.category(category, 'type', {
    readOnly: false
  });

  bridge.build();
}

var responsiveContent = document.querySelector('as-responsive-content');
if (!responsiveContent) {
  onReady();
} else {
  responsiveContent.addEventListener('ready', onReady);
}
