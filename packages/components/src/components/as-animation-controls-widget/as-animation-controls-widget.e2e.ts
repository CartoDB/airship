import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-animation-controls-widget', async () => {
  describe('Rendering', async () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();

      await page.setContent(`
        <as-animation-controls-widget
          heading='Title'
          description='Description'
          >
        </as-animation-controls-widget>
      `);
    });

    it('should render properly', async () => {
      const element = await page.find('as-animation-controls-widget');

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should render the range slider thumb if set to true', async () => {
      const element = await page.find('as-animation-controls-widget');
      element.setProperty('showThumb', true);

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should not render show the range slider thumb if set to false', async () => {
      const element = await page.find('as-animation-controls-widget');
      element.setProperty('showThumb', false);

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should render show the range slider thumb caption if set to true', async () => {
      const element = await page.find('as-animation-controls-widget');
      element.setProperty('showCaption', true);

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should not render show the range slider thumb caption if set to false', async () => {
      const element = await page.find('as-animation-controls-widget');
      element.setProperty('showCaption', false);

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should not render the widget header if showHeader property is False', async () => {
      const element = await page.find('as-animation-controls-widget');
      element.setProperty('showHeader', false);

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should not render the header if the heading is not present', async () => {
      const element = await page.find('as-animation-controls-widget');
      element.setProperty('heading', null);

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should not render the header if the description is not present', async () => {
      const element = await page.find('as-animation-controls-widget');
      element.setProperty('description', null);

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });
  });

  describe('Behaviour', async () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();

      await page.setContent(`
        <as-animation-controls-widget></as-animation-controls-widget>
      `);
    });

    it('should emit a play event when clicking to the button the first time', async () => {
      const element: E2EElement = await page.find('as-animation-controls-widget');
      const playPauseButton = await element.find('.as-animation-controls-widget__player > button');
      const pauseEventSpy = await element.spyOnEvent('play');

      // Click on pause
      playPauseButton.click();
      await page.waitForChanges();

      expect(pauseEventSpy).toHaveReceivedEvent();
    });

    it('should emit a pause event when clicking to the button the second time', async () => {
      const element: E2EElement = await page.find('as-animation-controls-widget');
      const playPauseButton = await element.find('.as-animation-controls-widget__player > button');
      const playEventSpy = await element.spyOnEvent('pause');

      // Click on play and pause
      playPauseButton.click();
      playPauseButton.click();
      await page.waitForChanges();

      expect(playEventSpy).toHaveReceivedEvent();
    });
  });
});
