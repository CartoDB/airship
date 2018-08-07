const path = require('path');

function utils (dirname) {
  function isObject (obj) {
    const type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }

  this.html = function (filename) {
    const filePath = path.resolve(dirname, `${filename}`);
    return `file://${filePath}.html`;
  };

  this.spec = function (label, filename, options) {
    let scenario = {
      label,
      url: filename
        ? this.html(filename)
        : this.html(label)
    };

    if (options && !isObject(options)) {
      throw new Error('options arguments must be an object.');
    }

    if (options) {
      scenario = {...scenario, ...options};
    }

    return scenario;
  }
}

module.exports = utils;
