const path = require('path');

function image (filename) {
  return path.resolve(__dirname, `img/${filename}`);
}

function html (filename) {
  return `file://${path.resolve(__dirname, '${filename}')}`;
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


module.exports = [
  spec(sidebarDesktopReference, sidebarDesktopScreenshot, sidebarUrl),
  spec(sidebarMobileReference, sidebarMobileScreenshot, sidebarUrl, true)
];
