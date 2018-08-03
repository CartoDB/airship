const icons = require('./paths');
const fs = require('fs');
const path = require('path');


for (const icon in icons) {
  const iconName = _getIconName(icon);
  fs.writeFileSync(path.join(__dirname, `./icons/${iconName}.svg`), _fileTemplate(icons[icon]));
}


function _getIconName(path) {
  return path.toLowerCase().replace(/_/g, '-');
}

function _fileTemplate(path) {
  return `<svg width="16px" height="16px" xmlns="http://www.w3.org/2000/svg"><path d="${path}"/></svg>`;
}
