const Utils = require('../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('Tabs', 'tabs.html', '.as-tabs .as-tabs__item'),
  u.spec('Tabs XL', 'tabs-xl.html', '.as-tabs .as-tabs__item'),
  u.spec('Tabs accesible', 'tabs-accesible.html', '.as-tabs .as-tabs__item')
];
