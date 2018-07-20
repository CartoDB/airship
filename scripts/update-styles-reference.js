#!/usr/bin/env node
const { exec } = require('child_process');
const rimraf = require('rimraf');
const vfs = require('vinyl-fs');
const sysPath = require('path');
const chalk = require('chalk');
const fs = require('fs');

const REFERENCE_IMG_SUFFIX = '-reference';

const serverAddress = process.argv[2];
const port = process.argv[3];

if (!serverAddress || !port) {
  console.error('Usage: npm run update-styles-reference {ip} {port}');
  process.exit(-1);
}

const sshString = `ssh -p ${port} ${serverAddress} -o StrictHostKeyChecking=no`;

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
  const findImagesCommand = `find airship/packages/styles/src/ -path '*.png' -not -path '*${REFERENCE_IMG_SUFFIX}.png'`;
  const command = `${sshString} "${findImagesCommand}"`;

  return executeTerminalCommand(command)
    .then(paths => paths.split('\n').filter(path => Boolean(path)));
};

const createDirectoryIfNotExists = function (directory) {
  if (!fs.existsSync(directory)) {
    return executeTerminalCommand(`mkdir -p ${directory}`);
  }

  return Promise.resolve();
};

const scpToLocalMachine = function (image) {
  const imagePath = image.replace('airship/', '');
  const referenceImagePath = imagePath.replace('.png', `${REFERENCE_IMG_SUFFIX}.png`);
  const localSystemPath = sysPath.join(process.cwd(), referenceImagePath);

  const destDirectory = localSystemPath.substring(0, localSystemPath.lastIndexOf('/'));

  return createDirectoryIfNotExists(destDirectory)
    .then(() => {
      const command = `scp -P ${port} ${serverAddress}:${image} ${localSystemPath}`;
      return executeTerminalCommand(command)
    })
    .then(() => localSystemPath);
};

// Main Execution
console.log(chalk.white('Update Image References · Airship Script'), '\n');
console.log(chalk.blue('Retrieving image paths from CircleCI server...'))
console.time('✨ Finished in');

getImagePaths()
  .then(imagePaths =>
    Promise.all(
      imagePaths.map((image, index) => {
        console.log(chalk.green(`Downloading image ${index} to local machine...`));
        console.log(image);
        return scpToLocalMachine(image)
      })
    )
  )
  .then(() => {
    console.timeEnd('✨ Finished in')
  })
  .catch(error => {
    throw error;
  });
