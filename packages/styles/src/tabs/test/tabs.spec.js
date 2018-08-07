const Utils = require('../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('Tabs', 'tabs', '.as-tabs .as-tabs__item'),
  u.spec('Tabs XL', 'tabs-xl', '.as-tabs .as-tabs__item'),
  u.spec('Tabs accesible', 'tabs-accesible', '.as-tabs .as-tabs__item')
];
