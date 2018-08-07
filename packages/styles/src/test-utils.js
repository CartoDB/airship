const path = require('path');

function utils (dirname) {
  this.html = function (filename) {
    const filePath = path.resolve(dirname, `${filename}`);
    return `file://${filePath}.html`;
  };

  this.spec = function (label, filename, readySelector) {
    let options = {
      label,
      url: filename
        ? this.html(filename)
        : this.html(label)
    };

    if (readySelector) {
      options.readySelector = readySelector;
    }

    return options;
  }
}

module.exports = utils;
