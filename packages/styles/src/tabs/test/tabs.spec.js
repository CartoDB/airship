const Utils = require('../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('Tabs', 'tabs', {
    readySelector: '.as-tabs .as-tabs__item'
  }),
  u.spec('Tabs XL', 'tabs-xl', {
    readySelector: '.as-tabs .as-tabs__item'
  }),
  u.spec('Tabs accesible', 'tabs-accesible', {
    readySelector: '.as-tabs .as-tabs__item'
  })
];
