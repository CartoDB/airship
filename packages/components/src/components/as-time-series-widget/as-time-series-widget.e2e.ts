import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

function parseTranslate(translateStr: string) {
  const match = /translate\(-?(\d+),-?(\d+)\)/gi.exec(translateStr);

  return [parseFloat(match[1]), parseFloat(match[2])];
}

describe('as-time-series-widget', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({ html: '<as-time-series-widget></as-time-series-widget>' });
  });

  describe('Rendering', () => {
    it('should not render button when animated is false', async () => {
      const element: E2EElement = await page.find('as-time-series-widget');
      element.setProperty('show-clear', 'false');
      await page.waitForChanges();

      const actual = await page.find('.as-time-series--play-button');

      expect(actual).toBeFalsy();
    });

    it('should not render the scrubber container', async () => {
      await page.find('as-time-series-widget');
      await page.waitForChanges();

      const actual = await page.find('.as-time-series--g');

      expect(actual).toBeFalsy();
    });

    it('should render the scrubber correctly', async () => {
      const element: E2EElement = await page.find('as-time-series-widget');
      element.setProperty('animated', 'true');
      await page.waitForChanges();
      element.setProperty('data', histogramData);
      await page.waitForChanges();
      element.setProperty('progress', '50');
      await page.waitForChanges();
      // Scrubber is randomnly incorrectly positioned :shrug:
      await page.waitFor(1000);

      const scrubber = await page.find('.as-time-series--scrubber');
      const line = await page.find('.as-time-series--line');

      const translateX = parseTranslate(scrubber.getAttribute('transform'))[0];
      const lineX2 = parseFloat(line.getAttribute('x2'));

      expect(Math.abs(translateX - lineX2)).not.toBeGreaterThan(3);
    });

    it('should render the x-axis as dates', async () => {
      const element: E2EElement = await page.find('as-time-series-widget');
      await page.waitForChanges();
      element.setProperty('animated', 'true');
      await page.waitForChanges();
      element.setProperty('data', histogramData);
      await page.waitForChanges();
      element.setProperty('progress', '50');
      await page.waitForChanges();

      const text = await page.find('.x-axis text');

      expect(text.innerText).not.toBe('0');
      expect(text.innerText).toContain('1970');
    });

    it('should fire a seek event', async () => {
      const element: E2EElement = await page.find('as-time-series-widget');
      element.setProperty('data', histogramData);
      await page.waitForChanges();
      element.setProperty('animated', 'true');
      await page.waitForChanges();
      element.setProperty('progress', '10');
      await page.waitForChanges();

      const bars = await element.findAll('.bar');
      const centerBar = bars[Math.floor(bars.length / 2)];
      const seekSpy = await element.spyOnEvent('seek');

      await centerBar.click();

      expect(seekSpy).toHaveReceivedEvent();
    });

    it('should fire play / pause events', async () => {
      const element: E2EElement = await page.find('as-time-series-widget');
      element.setProperty('animated', 'true');
      element.setProperty('data', histogramData);
      element.setProperty('progress', '10');
      element.setProperty('playing', 'false');
      await page.waitForChanges();

      const playButton = await element.find('.as-time-series--play-button');
      const playSpy = await element.spyOnEvent('play');
      const pauseSpy = await element.spyOnEvent('pause');

      await playButton.click();

      expect(playSpy).toHaveReceivedEvent();

      element.setProperty('playing', 'true');

      await page.waitForChanges();

      await playButton.click();

      expect(pauseSpy).toHaveReceivedEvent();
    });
  });
});

const histogramData = [
  { start: 0, end: 10, value: 5 },
  { start: 10, end: 20, value: 10 },
  { start: 20, end: 30, value: 15 },
  { start: 30, end: 40, value: 20 },
];
