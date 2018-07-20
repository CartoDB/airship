const exquisite = require('exquisite-sst');
const glob = require("glob")
const assert = require('assert');
const fs = require('fs');
const path = require('path');
require('colors');




(async () => {
  try {
    var browser = await exquisite.browser({ headless: false });
    const files = glob.sync(path.resolve(__dirname, '**/*.spec.js'));
    await Promise.all(files.map(test));
  } catch (err) {
    console.error(`${err}`.red);
  }
  finally {
    browser.close();
  }


  async function test(spec) {
    try {
      var { reference, snapshot, url } = require(spec);

      if (!fs.existsSync(reference)) {
        console.error(`Reference image not found: ${reference}`.red);
        process.exit(-1);
      }

      const diff = await exquisite.test({ reference, snapshot, url, delay: 100, browser });
      fs.unlinkSync(snapshot);
      assert.equal(diff, 0);
      console.log(`  ✔ ${url}`.green);
    } catch (err) {
      console.error(`  ✖ ${url}`.red);
      console.error(err);
      process.exit(-1);
    }
  }
})();

