import path from 'path';
import fs from 'fs'
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch'


const ELEMENT_TAG_NAME = 'as-button';
const SCREENSHOTS_DIR_NAME = '.screenshots';

const REFERENCE_PATH = path.join(__dirname, './.img/reference.png');
const IMAGE_PATH = path.join(__dirname, `../../${SCREENSHOTS_DIR_NAME}/${ELEMENT_TAG_NAME}.png`);
const URL = path.join(__dirname, '/button.html');


fixture(ELEMENT_TAG_NAME).page(URL)

test('vissual regression', async t => {
  await t.takeScreenshot(`${ELEMENT_TAG_NAME}.png`)
  const diff = await compare(IMAGE_PATH, REFERENCE_PATH);

  await t.expect(diff).eql(0);
});


function compare(output, original, threshold = 0.1) {
  return new Promise(resolve => {

    const img1 = fs.createReadStream(output).pipe(new PNG()).on('parsed', doneReading);
    const img2 = fs.createReadStream(original).pipe(new PNG()).on('parsed', doneReading);

    let filesRead = 0;
    function doneReading() {
      // Wait until both files are read.
      if (++filesRead < 2) {
        return;
      }

      // Do the visual diff.
      const diff = new PNG({ width: img1.width, height: img2.height });
      const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold });

      resolve(numDiffPixels);
    }
  });
}
