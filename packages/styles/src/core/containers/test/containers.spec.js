const Utils = require('../../../test-utils');
const u = new Utils(__dirname);

// Sidebar
// Desktop
const sidebarDesktopReference = u.image('containers-sidebar-reference.png');
const sidebarDesktopScreenshot = u.image('containers-sidebar-out.png');
const sidebarUrl = u.html('containers-in-sidebar.html');

// Mobile
const sidebarMobileReference = u.image('containers-sidebar-mobile-reference.png');
const sidebarMobileScreenshot = u.image('containers-sidebar-mobile-out.png');

// Bottom bar
// Desktop
const bottomDesktopReference = u.image('containers-bottom-reference.png');
const bottomDesktopScreenshot = u.image('containers-bottom-out.png');
const bottomUrl = u.html('containers-in-bottom.html');

// Mobile
const bottomMobileReference = u.image('containers-bottom-mobile-reference.png');
const bottomMobileScreenshot = u.image('containers-bottom-mobile-out.png');

// Legends
// Desktop
const legendsDesktopReference = u.image('containers-legends-reference.png');
const legendsDesktopScreenshot = u.image('containers-legends-out.png');
const legendsUrl = u.html('containers-in-legends.html');

// Mobile
const legendsMobileReference = u.image('containers-legends-mobile-reference.png');
const legendsMobileScreenshot = u.image('containers-legends-mobile-out.png');

// All together
// Desktop
const allDesktopReference = u.image('containers-all-reference.png');
const allDesktopScreenshot = u.image('containers-all-out.png');
const allUrl = u.html('containers-in-sidebar-bottom-and-legends.html');

// Mobile
const allMobileReference = u.image('containers-all-mobile-reference.png');
const allMobileScreenshot = u.image('containers-all-mobile-out.png');

module.exports = [
  u.spec(sidebarDesktopReference, sidebarDesktopScreenshot, sidebarUrl),
  u.spec(sidebarMobileReference, sidebarMobileScreenshot, sidebarUrl, true),
  u.spec(bottomDesktopReference, bottomDesktopScreenshot, bottomUrl),
  u.spec(bottomMobileReference, bottomMobileScreenshot, bottomUrl, true),
  u.spec(legendsDesktopReference, legendsDesktopScreenshot, legendsUrl),
  u.spec(legendsMobileReference, legendsMobileScreenshot, legendsUrl, true),
  u.spec(allDesktopReference, allDesktopScreenshot, allUrl)
];
