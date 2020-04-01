
import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-range-slider-thumb', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();

    await page.setContent(`
      <as-range-slider-thumb
        percentage="50"
        value="50"
        valueMin="0"
        valueMax="100"></as-range-slider-thumb>
      <div class="as-range-slider__rail"></div>
    `);
  });

  describe('Rendering', () => {
      it('should render a text with its value', async () => {
        const element = await page.find('as-range-slider-thumb');
        element.setProperty('value', 5);
        element.setProperty('formatValue', () => `${element.getProperty('value')}€`);
        await page.waitForChanges();

        expect(element.outerHTML).toMatchSnapshot();
      });

      it('should have aria attributes', async () => {
        const element = await page.find('as-range-slider-thumb');
        element.setProperty('value', 5);
        element.setProperty('valueMin', 0);
        element.setProperty('valueMax', 10);
        element.setProperty('percentage', 10);
        await page.waitForChanges();

        expect(element.outerHTML).toMatchSnapshot();
      });
  });

  describe('Interaction', () => {
    it('should emit thumbIncrease / thumbDecrease events when using keyboard arrows', async () => {
      await page.waitForChanges();
      const onThumbIncreaseSpy = await page.spyOnEvent('thumbIncrease');
      const onThumbDecreaseSpy = await page.spyOnEvent('thumbDecrease');

      const element = await page.find('.as-range-slider__thumb');

      await element.press('ArrowLeft');
      await element.press('ArrowRight');

      expect(onThumbDecreaseSpy).toHaveReceivedEvent();
      expect(onThumbIncreaseSpy).toHaveReceivedEvent();
    });

    it('should emit changeStart event when using mouse', async () => {
      const thumbChangeStart = await page.spyOnEvent('thumbChangeStart');

      const element = await page.find('.as-range-slider__thumb-handle');
      await element.click();

      expect(thumbChangeStart).toHaveReceivedEvent();
    });
  });
});
