const path = require('path');

const desktopWidth = 1080;
const desktopHeight = 720;
const mobileWidth = 375;
const mobileHeight = 667;

function utils(dirname) {
  this.image = function (filename) {
    return path.resolve(dirname, `img/${filename}`);
  };

  this.html = function (filename) {
    const filePath = path.resolve(dirname, `${filename}`);
    return `file://${filePath}.html`;
  };

  this.spec = function (name, options) {
    options = options || {};
    reference = options.mobile ? `${this.image(name)}-mobile-reference.png` : `${this.image(name)}-reference.png`;
    screenshot = options.mobile ? `${this.image(name)}-mobile-out.png` : `${this.image(name)}-out.png`;
    url = this.html(name);
    return {
      reference,
      screenshot,
      url,
      viewportWidth: options.mobile ? mobileWidth : desktopWidth,
      viewportHeight: options.mobile ? mobileHeight : desktopHeight
    };
  };
}

module.exports = utils;
