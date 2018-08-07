const Utils = require('../../test-utils');
const u = new Utils(__dirname);

module.exports = [
<<<<<<< HEAD
  u.spec('Tabs', 'tabs.html', '.as-tabs .as-tabs__item'),
  u.spec('Tabs XL', 'tabs-xl.html', '.as-tabs .as-tabs__item'),
  u.spec('Tabs accesible', 'tabs-accesible.html', '.as-tabs .as-tabs__item')
=======
  u.spec('tabs'),
  u.spec('tabs', { mobile: true }),
  u.spec('tabs-xl'),
  u.spec('tabs-xl', { mobile: true }),
  u.spec('tabs-accesible'),
  u.spec('tabs-accesible', { mobile: true })
>>>>>>> master
];
