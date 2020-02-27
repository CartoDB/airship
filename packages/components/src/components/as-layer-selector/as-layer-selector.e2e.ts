import { E2EPage, newE2EPage } from '@stencil/core/testing';

const layers = [
  {id: 'cartodb-1', title: 'Test Layer 1'},
  {id: 'cartodb-2', title: 'Test Layer 2'},
  {id: 'cartodb-3', title: 'Test Layer 3'},
  {id: 'cartodb-4', title: 'Test Layer 4'},
];

describe('as-layer-selector', async () => {
  describe('Rendering', async () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();

      await page.setContent(`
        <as-layer-selector></as-layer-selector>
      `);
    });

    it('should render properly', async () => {
      const element = await page.find('as-layer-selector');
      element.setProperty('layers', layers);

      await page.waitForChanges();

      expect(element.outerHTML).toMatchSnapshot();
    });
  });

  describe('Behaviour', async () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();

      await page.setContent(`
        <as-layer-selector></as-layer-selector>
      `);
    });

    it('should toggle selected content', async () => {
      const element = await page.find('as-layer-selector');
      element.setProperty('layers', layers);
      await page.waitForChanges();

      const checkboxSlotContent = await page.find('.as-checkbox-layer-slot');
      expect(checkboxSlotContent.classList.contains('as-checkbox-layer-slot--visible')).toBeTruthy();
      expect(checkboxSlotContent.classList.contains('as-checkbox-layer-slot--hidden')).toBeFalsy();

      // Unselect
      await page.click('.as-checkbox-input');
      await page.waitForChanges();

      expect(checkboxSlotContent.classList.contains('as-checkbox-layer-slot--hidden')).toBeTruthy();
      expect(checkboxSlotContent.classList.contains('as-checkbox-layer-slot--visible')).toBeFalsy();

      // Select Again
      await page.click('.as-checkbox-input');
      await page.waitForChanges();

      expect(checkboxSlotContent.classList.contains('as-checkbox-layer-slot--visible')).toBeTruthy();
      expect(checkboxSlotContent.classList.contains('as-checkbox-layer-slot--hidden')).toBeFalsy();
    });

    it('should emit a toggle event', async () => {
      const element = await page.find('as-layer-selector');
      const toggleLayerSpy = await element.spyOnEvent('onToggleLayer');
      element.setProperty('layers', layers);

      await page.waitForChanges();

      // Unselect
      await page.click('.as-checkbox-input');
      await page.waitForChanges();

      expect(toggleLayerSpy).toHaveReceivedEvent();
    });
  });
});
