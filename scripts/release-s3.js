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

async function putObject (args) {
  return new Promise((resolve, reject) => {
    S3.putObject(args, function (err, data) {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}

async function copyObject (source, destination) {
  return new Promise((resolve, reject) => {
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
  }
];

async function uploadAllFiles (dir, version, destination, subfolder='') {
  const parsedVersion = semver(version);
  let files;
  try {
    files = await readdir(dir);
  } catch (e) {
    console.error(e);
    return;
  }

  // All files will be uploaded to /version/, and copied to each of the versions here
  let copyVersions = [];

  if (parsedVersion.prerelease.length === 0) {
    copyVersions.push(`v${parsedVersion.major}`,
        `v${parsedVersion.major}.${parsedVersion.minor}`);
  }

  if (PRERELEASE) {
    copyVersions.push(PRERELEASE_VERSION);
  }

  for (const fileName of files) {
    const filePath = path.join(dir, fileName);

    if (fs.lstatSync(filePath).isDirectory()) {
      await uploadAllFiles(filePath, version, destination, fileName);
    } else {
      const dst = path.join(subfolder, fileName);
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
        continue;
      }

      objectConfig.Key = `${destination}/v${version}/${dst}`;

      try {
        spinner.setMessage(`Uploading ${objectConfig.Key}`);
        if (!DRY_RUN) {
          await putObject(objectConfig);
        }

        log(`✅  ${objectConfig.Key} ${fileContent.length} bytes. Compressed ${ratio > 100 ? `⚠️  \x1b[33m${ratio}` : ratio}%\x1b[0m`);
      } catch (e) {
        console.error(`❌  ${dst}`, e);
        continue;
      }

      for (copyVersion of copyVersions) {
        const dest = `${destination}/${copyVersion}/${dst}`;
        spinner.setMessage(`Copying ${dest}`);
        try {
          if (!DRY_RUN) {
            await copyObject(objectConfig.Key, dest);
          }
          log(`  ✅  Copied to ${dest}`);
        } catch (e) {
          console.error(`  ❌  Failed to copy to ${dest}`);
          console.error(e);
        }
      }
    }
  }
}

async function upload () {
  if (DRY_RUN) {
    log(`🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵`)
    log(`🌵 THIS IS A DRY RUN 🌵`)
    log(`🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵 🌵`)
  }
  for ({ version, src, name, dst } of UPLOAD) {
    const parsedVersion = PRERELEASE ? PRERELEASE_VERSION : `v${version}`;
    log(`Uploading files for ${name}(${parsedVersion})`);

    if (VERBOSE) {
      spinner.start();
    }

    await uploadAllFiles(src, version, dst);

    if (VERBOSE) {
      spinner.stop();
    }
  }

  log(`Done`);
}

// For debugging
async function listFiles (prefix = 'airship-components-test/') {
  const files = await listObjects({Prefix: prefix, Bucket: secrets.AWS_S3_BUCKET });
  log(`${files.Contents.length} with prefix '${prefix}'`)
}

upload();
