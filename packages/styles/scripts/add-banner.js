const version = require('../package.json').version;
const map = require('map-stream');
const path = require('path');
const vfs = require('vinyl-fs');
const fs = require('fs');

const banner = `/*!
* Airship Styles · CARTO · https://carto.com
* Version ${version}
* ${new Date().toISOString()}
*/
`;
const buffer = Buffer.from(banner);

function getFilesIn(directory) {
  return vfs.src(directory);
}

function appendBannerToFile(file) {
  const fileDescriptor = fs.openSync(file.path, 'w+');
  fs.writeSync(fileDescriptor, buffer, 0, buffer.length, 0);
  fs.writeSync(fileDescriptor, file.contents, 0, file.contents, buffer.length);
  fs.close(fileDescriptor);
}

getFilesIn(path.join(__dirname, '../dist/**/*.css'))
.pipe(map(appendBannerToFile));
