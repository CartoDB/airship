const Utils = require('../../../test-utils');
const u = new Utils(__dirname);

module.exports = [
  u.spec('Containers in sidebar', 'containers-in-sidebar.html'),
  u.spec('Containers in bottom', 'containers-in-bottom.html'),
  u.spec('Containers in legends', 'containers-in-legends.html'),
  u.spec('Containers in bottom and legends', 'containers-in-sidebar-bottom-and-legends.html')
];
