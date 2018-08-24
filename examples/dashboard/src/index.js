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

  const source = new carto.source.SQL('SELECT * FROM airbnb_listings');

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
  let priceFilter = new carto.filter.Range('price');
  source.addFilter(priceFilter);

  const histogramWidget = document.querySelector('.js-histogram');
  histogramWidget.addEventListener('selectionChanged', event => {
    if (event.detail) {
      const [min, max] = event.detail;
      priceFilter.setFilters({ between: { min, max }});
    } else {
      source.removeFilter(priceFilter);
      priceFilter = new carto.filter.Range('price');
      source.addFilter(priceFilter);
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
