const path = require('path');
const sass = require('@stencil/sass');

exports.config = {
  namespace: 'airship',
  outputTargets:[
    { type: 'dist' },
    {
      type: 'www',
      serviceWorker: false,
      empty: false,
      dir: path.join(__dirname, '../../www')
    }
  ],
  plugins: [
    sass({
      outFile: path.join(__dirname, '.generated-styles')
    })
  ]
};
