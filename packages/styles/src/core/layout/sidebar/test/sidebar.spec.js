const path = require('path');

// Mobile Viewport Settings
const viewportWidth = 375;
const viewportHeight = 667;


// Desktop
// Both sidebars should be visible
const desktopReference = path.resolve(__dirname, 'img/sidebar-reference.png');
const desktopScreenshot = path.resolve(__dirname, 'img/sidebar-out.png');

// Mobile
// Both sidebars should be hidden
const mobileHiddenSidebarsReference = path.resolve(__dirname, 'img/sidebar-hidden-mobile-reference.png');
const mobileHiddenSidebarsScreenshot = path.resolve(__dirname, 'img/sidebar-hidden-mobile-out.png');

// URL to take the screenshot from
const url = `file://${path.resolve(__dirname, 'sidebar.html')}`;

// Mobile
// The sidebar should be visible
const mobileVisibleSidebarsReference = path.resolve(__dirname, 'img/sidebar-visible-mobile-reference.png');
const mobileVisibleSidebarsScreenshot = path.resolve(__dirname, 'img/sidebar-visible-mobile-out.png');

// URL to take the screenshot from
const mobileVisibleURL = `file://${path.resolve(__dirname, 'sidebar-mobile-visible.html')}`;

module.exports = [
  { reference: desktopReference, screenshot: desktopScreenshot, url },
  { reference: mobileHiddenSidebarsReference, screenshot: mobileHiddenSidebarsScreenshot, url, viewportWidth, viewportHeight },
  { reference: mobileVisibleSidebarsReference, screenshot: mobileVisibleSidebarsScreenshot, url: mobileVisibleURL, viewportWidth, viewportHeight },
];
