const path = require('path');
const sass = require('@stencil/sass');
const version = require('./package.json').version;

exports.config = {
  namespace: 'airship',
  copy: [{ src: 'components/**/*.html' }],
  globalStyle: path.join(__dirname, '../styles/src/core/_dev.scss'),
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
      outFile: path.join(__dirname, '.generated-styles'),
      injectGlobalPaths: [
        path.join(__dirname, '../styles/src/core/variables/_variables.scss')
      ]
    })
  ],
  preamble: 'Airship Components · CARTO · https://carto.com'
};
