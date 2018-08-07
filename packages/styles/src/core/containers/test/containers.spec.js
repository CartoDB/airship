const Utils = require('../../../test-utils');
const utils = new Utils(__dirname);

module.exports = [
  utils.spec('Containers in sidebar', 'containers-in-sidebar'),
  utils.spec('Containers in bottom', 'containers-in-bottom'),
  utils.spec('Containers in legends', 'containers-in-legends'),
  utils.spec('Containers in bottom and legends', 'containers-in-sidebar-bottom-and-legends')
];
