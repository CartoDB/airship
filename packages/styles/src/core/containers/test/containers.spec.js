const Utils = require('../../../test-utils');
const utils = new Utils(__dirname);


module.exports = [
  utils.spec('containers-in-sidebar'),
  utils.spec('containers-in-sidebar', true),
  utils.spec('containers-in-bottom'),
  utils.spec('containers-in-bottom', true),
  utils.spec('containers-in-legends'),
  utils.spec('containers-in-legends', true),
  utils.spec('containers-in-sidebar-bottom-and-legends'),
  utils.spec('containers-in-sidebar-bottom-and-legends', true),
];
