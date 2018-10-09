import { EventSpy } from '@stencil/core/dist/declarations';
import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-switch', async () => {
  describe('Rendering', async () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage({ html: `<as-switch id="switch" label="Switch Label"></as-switch>` });
    });

    it('should render label if prop is present', async () => {
      const screenshotResults = await page.compareScreenshot();
      expect(screenshotResults).toMatchScreenshot();
    });
  });

  describe('when the component is enabled', () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage({ html: `<as-switch id="switch"></as-switch>` });
    });

    it('should emit an event with current status when component toggles false->true', async () => {
      const changeSpy = await page.spyOnEvent('change');

      const element = await page.find('as-switch');
      element.click();

      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventDetail(true);
    });

    it('should emit an event with current status when component toggles false->true->false->true', async () => {
      const changeSpy: EventSpy = await page.spyOnEvent('change');

      const element = await page.find('as-switch');
      element.click();
      element.click();
      element.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(3);
      expect(changeSpy.events[0].detail).toBe(true);
      expect(changeSpy.events[1].detail).toBe(false);
      expect(changeSpy.events[2].detail).toBe(true);
    });
  });

  describe('when the component is disabled', () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage({ html: `<as-switch disabled id="switch"></as-switch>` });
    });

    it('should NOT emit an event with current status when component toggles', async () => {
      const changeSpy: EventSpy = await page.spyOnEvent('change');

      const element = await page.find('as-switch');
      element.click();
      await page.waitForChanges();

      expect(changeSpy).not.toHaveReceivedEvent();
    });
  });

  describe('when the component is checked', () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage({ html: `<as-switch checked id="switch"></as-switch>` });
    });

    it('should return event (FALSE) when the element is clicked for the first time', async () => {
      const changeSpy: EventSpy = await page.spyOnEvent('change');

      const element = await page.find('as-switch');
      element.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventDetail(false);
    });
  });
});
