#!/usr/bin/env node

const { exec } = require('child_process');
const rimraf = require('rimraf');
const vfs = require('vinyl-fs');
const sysPath = require('path');
const chalk = require('chalk');
const fs = require('fs');

const serverAddress = process.argv[2];
const port = process.argv[3];

const sshString = `ssh -p ${port} ${serverAddress} -oStrictHostKeyChecking=no`;

const executeTerminalCommand = function (command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }

      if (stderr) {
        console.error(stderr);
        reject(stderr);
      }

      resolve(stdout);
    });
  });
};

const getImagePaths = function () {
  const findImagesCommand = "find airship/packages/styles/src/ -name '*' -path '*.png'";
  const command = `${sshString} "${findImagesCommand}"`;

  return executeTerminalCommand(command)
  .then(paths => {
    const allPaths = paths.split('\n');
    allPaths.splice(-1, 1);

    return allPaths;
  });
};

const scpToLocalMachine = function (image, path) {
  const imagePath = image.replace('airship/packages/styles/src/', '');

  const localSystemPath = sysPath.join(process.cwd(), path, imagePath);

  // Create directory if not exists
  let directory = localSystemPath.split('/');
  directory.pop()
  directory = directory.join('/');

  let flow = Promise.resolve();

  if (!fs.existsSync(directory)) {
    flow = executeTerminalCommand(`mkdir -p ${directory}`);
  }

  return flow.then(() => {
    const command = `scp -P ${port} ${serverAddress}:${image} ${localSystemPath}`;

    return executeTerminalCommand(command)
    .then(() => localSystemPath);
  });
};


const copyFilesTo = function (filePaths, outputPath) {
  return vfs.src(filePaths)
  .pipe(vfs.dest(outputPath));
};

// Main Execution

console.log(chalk.white('Update Image References · Airship Script'), '\n');
console.log(chalk.blue('Retrieving image paths from CircleCI server...'))
console.time('✨ Finished in');

getImagePaths()
.then(imagePaths => {
  return Promise.all(
    imagePaths.map((image, index) => {
      console.log(chalk.green(`Downloading image ${index} to local machine...`));
      console.log(image);
      return scpToLocalMachine(image, '.tmp')
    })
  )
})
.then(localPaths => {
  console.log(chalk.blue('Replacing previous image reference with the one obtained from the server...'), '\n');
  return copyFilesTo('.tmp/**/*', sysPath.join(process.cwd(), 'packages/styles/src'));
})
.then(() => {
  rimraf('./tmp', () => {
    console.timeEnd('✨ Finished in')
  });
});
