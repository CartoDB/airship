const Utils = require('../../../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('Sidebar', 'sidebar'),
  u.spec('Visible sidebar in mobil', 'sidebar-mobile-visible')
];
