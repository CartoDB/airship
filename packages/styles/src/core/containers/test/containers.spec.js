const Utils = require('../../../test-utils');
const utils = new Utils(__dirname);


module.exports = [
  utils.spec('containers-in-sidebar'),
  utils.spec('containers-in-sidebar', { mobile: true }),
  utils.spec('containers-in-bottom'),
  utils.spec('containers-in-bottom', { mobile: true }),
  utils.spec('containers-in-legends'),
  utils.spec('containers-in-legends', { mobile: true }),
  utils.spec('containers-in-sidebar-bottom-and-legends'),
  utils.spec('containers-in-sidebar-bottom-and-legends', { mobile: true }),
];
