const path = require('path');

function utils (dirname) {
  this.image = function (filename) {
    return path.resolve(dirname, `img/${filename}`);
  };
  
  this.html = function (filename) {
    const filePath = path.resolve(dirname, `${filename}`);
    return `file://${filePath}`;
  };

  this.spec = function (reference, screenshot, url, mobile) {
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
  };
}

module.exports = utils;
