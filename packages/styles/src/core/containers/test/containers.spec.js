const path = require('path');

function image (filename) {
  return path.resolve(__dirname, `img/${filename}`);
}

function html (filename) {
  const filePath = path.resolve(__dirname, `${filename}`);
  return `file://${filePath}`;
}

function spec (reference, screenshot, url, mobile) {
  const desktopWidth = 1080;
  const desktopHeight = 720;
  const mobileWidth = 375;
  const mobileHeight = 667;

  return {
    reference,
    screenshot,
    url,
    viewportWidth: mobile
      ? mobileWidth
      : desktopWidth,
    viewportHeight: mobile
      ? mobileHeight
      : desktopHeight
  };
}

// Sidebar
// Desktop
const sidebarDesktopReference = image('containers-sidebar-reference.png');
const sidebarDesktopScreenshot = image('containers-sidebar-out.png');
const sidebarUrl = html('containers-in-sidebar.html');

// Mobile
const sidebarMobileReference = image('containers-sidebar-mobile-reference.png');
const sidebarMobileScreenshot = image('containers-sidebar-mobile-out.png');

// Bottom bar
// Desktop
const bottomDesktopReference = image('containers-bottom-reference.png');
const bottomDesktopScreenshot = image('containers-bottom-out.png');
const bottomUrl = html('containers-in-bottom.html');

// Mobile
const bottomMobileReference = image('containers-bottom-mobile-reference.png');
const bottomMobileScreenshot = image('containers-bottom-mobile-out.png');

// Legends
// Desktop
const legendsDesktopReference = image('containers-legends-reference.png');
const legendsDesktopScreenshot = image('containers-legends-out.png');
const legendsUrl = html('containers-in-legends.html');

// Mobile
const legendsMobileReference = image('containers-legends-mobile-reference.png');
const legendsMobileScreenshot = image('containers-legends-mobile-out.png');

// All together
// Desktop
const allDesktopReference = image('containers-all-reference.png');
const allDesktopScreenshot = image('containers-all-out.png');
const allUrl = html('containers-in-sidebar-bottom-and-legends.html');

// Mobile
const allMobileReference = image('containers-all-mobile-reference.png');
const allMobileScreenshot = image('containers-all-mobile-out.png');


module.exports = [
  spec(sidebarDesktopReference, sidebarDesktopScreenshot, sidebarUrl),
  spec(sidebarMobileReference, sidebarMobileScreenshot, sidebarUrl, true),
  spec(bottomDesktopReference, bottomDesktopScreenshot, bottomUrl),
  spec(bottomMobileReference, bottomMobileScreenshot, bottomUrl, true)
  spec(legendsDesktopReference, legendsDesktopScreenshot, legendsUrl),
  spec(legendsMobileReference, legendsMobileScreenshot, legendsUrl, true),
  spec(allDesktopReference, allDesktopScreenshot, allUrl)
];
