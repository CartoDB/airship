const applicationContent = document.querySelector('as-application-content');

applicationContent.addEventListener('load', () => {
  const madrid = [40.42252398976147, -3.659729361534119];
  const map = L.map('map').setView(madrid, 12);


  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);

  const client = new carto.Client({
    apiKey: 'default_public',
    username: 'cartojs-test'
  });

  // const source = new carto.source.SQL('SELECT * FROM airbnb_listings');
  const source = new carto.source.Dataset('airbnb_listings');

  const style = new carto.style.CartoCSS(`
    #layer {
      marker-width: 7;
      marker-fill: #EE4D5A;
      marker-line-color: #FFFFFF;
      marker-fill: ramp([room_type], (#88CCEE, #CC6677, #DDCC77), ("Entire home/apt", "Private room", "Shared room"), "=");
    }
  `);
  const layer = new carto.layer.Layer(source, style);

  client.addLayer(layer);
  client.getLeafletLayer().addTo(map);

  const histogramDataview = new carto.dataview.Histogram(source, 'price', {
    bins: 10
  });

  const categoryDataview = new carto.dataview.Category(source, 'neighbourhood_group', {
    limit: 6
  });

  const bboxFilter = new carto.filter.BoundingBoxLeaflet(map);
  histogramDataview.addFilter(bboxFilter);
  categoryDataview.addFilter(bboxFilter);

  histogramDataview.on('dataChanged', data => {
    const histogramWidget = document.querySelector('.js-histogram');
    const widgetData = data.bins.map(bin => {
      return {
        start: bin.start,
        end: bin.end,
        value: bin.freq
      };
    });
    histogramWidget.data = widgetData;
  });

  categoryDataview.on('dataChanged', data => {
    const categoryWidget = document.querySelector('.js-category');
    const widgetData = data.categories.map(category => {
      return {
        name: category.name,
        value: category.value
      };
    });
    categoryWidget.categories = widgetData;
  });

  // Filters
  let priceFilter = null;
  let neighbourhoodFilter = null;

  const histogramWidget = document.querySelector('.js-histogram');
  histogramWidget.addEventListener('selectionChanged', event => {
    if (!event.detail && priceFilter !== null) {
      source.removeFilter(priceFilter);
      priceFilter = null;
    } else if (event.detail && priceFilter === null) {
      const [min, max] = event.detail;
      priceFilter = new carto.filter.Range('price', { between: { min, max }});
      source.addFilter(priceFilter);
    } else {
      const [min, max] = event.detail;
      priceFilter.setFilters({ between: { min, max }});
    }
  });

  const categoryWidget = document.querySelector('.js-category');
  categoryWidget.addEventListener('categoriesSelected', event => {
    const categories = event.detail;
    if (!event.detail.length && neighbourhoodFilter !== null) {
      source.removeFilter(neighbourhoodFilter);
      neighbourhoodFilter = null;
    } else if (event.detail.length && neighbourhoodFilter === null) {
      neighbourhoodFilter = new carto.filter.Category('neighbourhood_group', { in: categories });
      source.addFilter(neighbourhoodFilter);
    } else {
      neighbourhoodFilter.setFilters({ in: categories});
    }
  });

  client.addDataview(histogramDataview);
  client.addDataview(categoryDataview);
});

applicationContent.addEventListener('sectionChange', (section) => {
  const mapElement = document.querySelector('.as-map');  
  section.detail.name === 'Map'
    ? mapElement.classList.remove('as-map--hidden')
    : mapElement.classList.add('as-map--hidden')
});

function toggleDrawer() {
  document.querySelector('.as-toolbar__actions').classList.toggle('as-toolbar__actions--visible');
}
