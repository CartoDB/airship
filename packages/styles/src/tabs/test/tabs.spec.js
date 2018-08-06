const Utils = require('../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('tabs'),
  u.spec('tabs', { mobile: true }),
  u.spec('tabs-xl'),
  u.spec('tabs-xl', { mobile: true }),
  u.spec('tabs-accesible'),
  u.spec('tabs-accesible', { mobile: true })
];
