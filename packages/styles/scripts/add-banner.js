const version = require('../package.json').version;

const banner = `/*!
* Airship Styles · CARTO · https://carto.com
* Version ${version}
* ${new Date().toISOString()}
*/`;

process.stdout.write(banner);
