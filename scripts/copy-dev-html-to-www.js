const vfs = require('vinyl-fs');
const chokidar = require('chokidar');
const path = require('path');
const cwd = process.cwd();

const copyFilesToOutput = function (paths, outputPath) {
  return vfs.src(paths)
   .pipe(vfs.dest(outputPath));
};

const watchDirectory = function (directory, callback) {
  const watcher = chokidar.watch(directory);
  watcher.on('change', callback);
};

const serverPath = path.join(cwd, './www');

const componentsPath = path.join(cwd, './packages/components/src/components');
const outputComponentsPath = path.join(serverPath, 'components');
copyFilesToOutput([`${componentsPath}/**/*.html`], outputComponentsPath);

const elementsPath = path.join(cwd, './packages/styles/src');
const outputElementsPath = path.join(serverPath, 'elements');
copyFilesToOutput([`${elementsPath}/**/*.html`], outputElementsPath);

watchDirectory(serverPath, () => {
  copyFilesToOutput([`${componentsPath}/**/*.html`], outputComponentsPath);
  copyFilesToOutput([`${elementsPath}/**/*.html`], outputElementsPath);
});
