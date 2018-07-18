import path from 'path';
import { compare } from '../test-utils';


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
