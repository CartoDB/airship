const { execSync } = require('child_process');
const assert = require('assert');
const exquisite = require('exquisite-sst');
const fs = require('fs');
const glob = require("glob")
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
      var { reference, screenshot, url, viewportWidth, viewportHeight } = require(spec);
      if (!fs.existsSync(reference)) {
        console.warn(`Reference image not found, generating a new one: ${reference}`.yellow);
        await exquisite.getReference({ output: reference, url, delay: 100, browser, viewportWidth, viewportHeight });
        execSync(`chmod +x ${path.join(__dirname, '../../../scripts/circleci-screenshots.sh')}`);
        execSync(path.join(__dirname, '../../../scripts/circleci-screenshots.sh'));
      }

      const diff = await exquisite.test({ input: reference, output: screenshot, url, delay: 100, browser, viewportWidth, viewportHeight });
      assert.equal(diff, 0);

      if (!process.env.CI) {
        fs.unlinkSync(screenshot);
      }
      console.log(`  ✔ ${url}`.green);
    } catch (err) {
      console.error(`  ✖ ${url}`.red);
      console.error(err);
      process.exit(-1);
    }
  }
})();

