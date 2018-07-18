const assert = require('assert');
const path = require('path');
const fs = require('fs');
const exquisite = require('exquisite-sst');
const colors = require('colors');

// Wait 2000 ms after the loaded event to take the screenshot
const delay = 1000

// Reference image
const input = path.resolve(__dirname, 'img/reference.png');
// Path where the screenshot will be saved
const output = path.resolve(__dirname, 'img/button.png');

// Url to take the screenshot from
const url = `file://${path.resolve(__dirname, 'button.html')}`;

console.log('Visual regression testing:');
// Take the screenshot and compare it against the reference image.
exquisite.test({ input, output, url, delay })
  .then(differentPixels => {
    // Delete the screenshot
    fs.unlinkSync(output);
    // Assert the result
    assert.equal(differentPixels, 0);
  })
  .then(() => {
    console.error(`  ✔ ${url}`.green);
  })
  .catch(err => {
    console.error(`  ✖ ${url}`.red);
  });
