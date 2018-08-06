const Utils = require('../../../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('sidebar'),
  u.spec('sidebar', { mobile: true }),
  u.spec('sidebar-mobile-visible'),
  u.spec('sidebar-mobile-visible', { mobile: true }),
];
