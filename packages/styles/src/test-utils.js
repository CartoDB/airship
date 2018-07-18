import fs from 'fs';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

export function compare(output, original, threshold = 0.1) {
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
