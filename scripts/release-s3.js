const readline = require('readline');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const semver = require('semver');
const mime = require('mime');
const secrets = require('../secrets.json');
const Spinner = require('./spinner.js');

const { promisify } = require('util');

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const gzip = promisify(zlib.gzip);

AWS.config.update({
  accessKeyId: secrets.AWS_USER_S3_KEY,
  secretAccessKey: secrets.AWS_USER_S3_SECRET
}, true);

const S3 = new AWS.S3();
const DRY_RUN = process.argv.some(arg => arg === '--dry');
const VERBOSE = process.argv.some(arg => arg === '--verbose');
const PRERELEASE = process.argv.some(arg => arg === '--prerelease');
const spinner = new Spinner();

// this is the s3 folder where the prereleased version will end up
// https://libs.cartocdn.com/${PACKAGE_NAME}/${PRERELEASE_VERSION}/<files>
const PRERELEASE_VERSION = 'prerelease';

// Woff is a zipped format.
// If we ever have raster images we should probably put them here as well
function shouldZip (ext) {
  if (ext === '.woff') {
    return false;
  }

  return true;
}

function needsUTF8 (ext) {
  return (ext !== '.ttf' && ext !== '.woff');
}

function log (what) {
  if (!VERBOSE) {
    return;
  }

  console.log(what);
}

async function putObject (args, dry = false) {
  return new Promise((resolve, reject) => {
    if (dry) {
      resolve();
    } else {
      S3.putObject(args, function (err, data) {
        if (err) {
          reject(err);
          return;
        }
  
        resolve(data);
      });
    }
  });
}

async function copyObject (source, destination, dry = false) {
  return new Promise((resolve, reject) => {
    if (dry) {
      resolve();
    } else {
      S3.copyObject({
        Bucket: secrets.AWS_S3_BUCKET,
        ACL: 'public-read',
        CopySource: `${secrets.AWS_S3_BUCKET}/${source}`,
        Key: destination
      }, (err, data) => {
        if (err) {
          reject(err);
          return;
        }
  
        resolve(data);
      });
    }
  });
}

async function listObjects (args) {
  return new Promise((resolve, reject) => {
    S3.listObjects(args, function (err, data) {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}

// For debugging
async function listFiles (prefix = 'airship-style/') {
  const files = await listObjects({Prefix: prefix, Bucket: secrets.AWS_S3_BUCKET });
  log(`${files.Contents.length} with prefix '${prefix}'`)
  for (let file of files.Contents) {
    log(`${file.Key}`)
  }
}

function parseFiles(files) {
  return files.map((filePath) => ({
    filePath,
    dst: path.basename(filePath)
  }));
}

/**
 * Recursively walks through directory structure, returns all files as { name, dir }
 * @param {string} fd Base directory to start walking
 */
async function getAllFiles(fd) {
  if (fs.lstatSync(fd).isDirectory()) {
    const fileList = await readdir(fd);
    let files = [];

    for (let file of fileList) {
      const filePath = path.join(fd, file);

      const subFiles = await getAllFiles(filePath)
      files = files.concat(subFiles);
    }

    return files;
  } else {
    return fd;
  }
}


/**
 * Upload config
 * 
 * name is just for debugging purposes / documentation
 *
 * src can be a directory (string) or an array of files. 
 * 
 * For the directory, we'll recursively get all the absolute paths, and then we'll build objects with said
 * absolute path and the relative path to the rootPath. This relative path is used for the destination in S3
 * 
 * For the array of files, they will all be placed on the root of the specified subfolder.
 * 
 * dst is the 'subfolder' on s3 <dst>/<version>/<relativePathOfFile>
 * 
 * version will be used on the destination on S3. It will get parsed with semver to create 'symlinks' pointing
 * to major and minor versions. Example:
 * 
 * The following version will be uploaded to the first, and copied to the other
 * v1.0.1 => <dst>/v1.0.1/...
 *           <dst>/v1.0/...
 *           <dst>/v1/...
 */
const UPLOAD = [
  {
    name: 'Airship Components',
    src: path.join(__dirname, '../packages/components/dist'),
    dst: 'airship-components',
    version: require('../packages/components/package.json').version
  },
  {
    name: 'Airship Icons',
    src: path.join(__dirname, '../packages/icons/dist'),
    dst: 'airship-icons',
    version: require('../packages/icons/package.json').version
  },
  {
    name: 'Airship Styles',
    src: path.join(__dirname, '../packages/styles/dist'),
    dst: 'airship-style',
    version: require('../packages/styles/package.json').version
  },
  {
    name: 'Airship Bridge',
    src: [
      path.join(__dirname, '../packages/bridge/dist/asbridge.js'),
      path.join(__dirname, '../packages/bridge/dist/asbridge.min.js')
    ],
    dst: 'airship-bridge',
    version: require('../packages/bridge/package.json').version
  }
];

let totalFiles = 0;
let uploaded = 0;
let failed = 0;

async function uploadAllFiles (files, version, destination) {
  const parsedVersion = semver(version);

  // All files will be uploaded to /version/, and copied to each of the versions here
  let copyVersions = [];

  if (parsedVersion.prerelease.length === 0) {
    copyVersions.push(`v${parsedVersion.major}`,
        `v${parsedVersion.major}.${parsedVersion.minor}`);
  }

  if (PRERELEASE) {
    copyVersions.push(PRERELEASE_VERSION);
  }

  let promises = [];
  for (const file of files) {
    promises.push(uploadFile(file, destination, copyVersions));
  }

  return Promise.all(promises);
}

async function uploadFile ({ filePath, dst }, destination, copyVersions) {
  const extension = path.extname(filePath);
  const objectConfig = {
    ACL: 'public-read',
    Bucket: secrets.AWS_S3_BUCKET
  };
  let fileLength = 0; // uncompressed size
  let fileContent;
  let ratio = 0;

  objectConfig.ContentType = `${mime.getType(filePath)}${needsUTF8(extension) ? '; charset=utf-8' : ''}`;

  try {
    fileContent = await readFile(filePath, needsUTF8(extension) ? { encoding: 'utf8' } : {});
    fileLength = fileContent.length;

    if (shouldZip(extension)) {
      fileContent = await gzip(fileContent);
      objectConfig.ContentEncoding = 'gzip';
    }

    objectConfig.Body = fileContent;

    ratio = Math.round((fileContent.length / fileLength) * 100);
  } catch (e) {
    console.error(e);
    return;
  }

  objectConfig.Key = `${destination}/v${version}/${dst}`;
  
  totalFiles++;
  updateSpinner();

  return putObject(objectConfig, DRY_RUN)
    .then(() => {
      log(`✅  ${objectConfig.Key} ${fileContent.length} bytes. Compressed ${ratio > 100 ? `⚠️  \x1b[33m${ratio}` : ratio}%\x1b[0m`);
      uploaded++;
      updateSpinner();
    })
    .then(() => {
      for (copyVersion of copyVersions) {
        const dest = `${destination}/${copyVersion}/${dst}`;
        copyObject(objectConfig.Key, dest, DRY_RUN)
          .then(() => {
            log(`✅  Copied to ${dest}`);
            uploaded++;
            updateSpinner();
          })
          .catch((e) => {
            console.error(`❌  Failed to copy to ${dest}`);
            console.error(e);
            failed++;
            updateSpinner();
          });
        
        totalFiles++;
        updateSpinner();
      }
    })
    .catch((e) => {
      console.error(`❌  ${dst}`, e);
      failed++;
      updateSpinner();
    });
}

function updateSpinner() {
  if (VERBOSE) {
    spinner.setMessage(`${uploaded}/${totalFiles} (${failed} failed)`);
  }
}

async function upload () {
  if (DRY_RUN) {
    log(`🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵`)
    log(`🌵 THIS IS A DRY RUN 🌵`)
    log(`🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵`)
  }
  
  if (VERBOSE) {
    spinner.start();
  }
  
  const startTime = Date.now();
  for ({ version, src, name, dst } of UPLOAD) {
    let files;

    if (Array.isArray(src)) {
      files = parseFiles(src);
    } else {
      files = await getAllFiles(src);

      // We need to know the relative path from the source directory
      files = files.map((filePath) => {
        return {
          filePath,
          dst: path.relative(src, filePath)
        }
      });
    }

    // We wait for all the files of each group to be uploaded.
    await uploadAllFiles(files, version, dst);
  }

  const endTime = Date.now();

  if (VERBOSE) {
    spinner.stop();

    log(`Uploaded ${totalFiles} with ${failed === 0 ? 'no' : failed} failures`);
    log(`Took ${(endTime - startTime) / 1000} seconds`);
  }
}

upload();
