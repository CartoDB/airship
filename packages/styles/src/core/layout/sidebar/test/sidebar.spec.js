const Utils = require('../../../../test-utils');
const u = new Utils(__dirname);

// Desktop
// Both sidebars should be visible
const desktopReference = u.image('sidebar-reference.png');
const desktopScreenshot = u.image('sidebar-out.png');

// Mobile
// Both sidebars should be hidden
const mobileHiddenSidebarsReference = u.image('sidebar-hidden-mobile-reference.png');
const mobileHiddenSidebarsScreenshot = u.image('sidebar-hidden-mobile-out.png');

// URL to take the screenshot from
const url = u.html('sidebar.html');

// Mobile
// The sidebar should be visible
const mobileVisibleSidebarsReference = u.image('sidebar-visible-mobile-reference.png');
const mobileVisibleSidebarsScreenshot = u.image('sidebar-visible-mobile-out.png');

// URL to take the screenshot from
const mobileVisibleURL = u.html('sidebar-mobile-visible.html');

module.exports = [
  u.spec(desktopReference, desktopScreenshot, url),
  u.spec(mobileHiddenSidebarsReference, mobileHiddenSidebarsScreenshot, url, true),
  u.spec(mobileVisibleSidebarsReference, mobileVisibleSidebarsScreenshot, mobileVisibleURL, true)
];
