import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-category-widget', async () => {
  describe('Rendering', async () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();

      await page.setContent(`
        <as-dropdown></as-dropdown>
      `);
    });

    it('should render properly', async () => {
      const element = await page.find('as-dropdown');
      element.setProperty('options', exampleOptions);
      element.setProperty('selectedOption', 'option2');

      await page.waitForChanges();

      const screenshotResults = await page.compareScreenshot();
      expect(screenshotResults).toMatchScreenshot();
    });

    it('should render clear button when showClearButton is true and an option is selected', async () => {
      const element = await page.find('as-dropdown');
      element.setProperty('options', exampleOptions);
      element.setProperty('selectedOption', 'option2');
      element.setProperty('showClearButton', true);

      await page.waitForChanges();

      const screenshotResults = await page.compareScreenshot();
      expect(screenshotResults).toMatchScreenshot();
    });

    it('should show defaultText when there is no selected option', async () => {
      const element = await page.find('as-dropdown');
      element.setProperty('options', exampleOptions);
      element.setProperty('defaultText', 'Dropdown');

      await page.waitForChanges();

      const screenshotResults = await page.compareScreenshot();
      expect(screenshotResults).toMatchScreenshot();
    });
  });

  describe('Behaviour', async () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();

      await page.setContent(`
        <as-dropdown></as-dropdown>
      `);
    });

    it('should emit an event containing selected option when option changes', async () => {
      const element = await page.find('as-dropdown');
      element.setProperty('options', exampleOptions);
      await page.waitForChanges();

      // Open Dropdown
      const controlElement = await page.find('.as-dropdown__control');
      controlElement.click();
      await page.waitForChanges();

      const categoriesSelectedSpy = await page.spyOnEvent('optionChanged');

      const optionElement = await page.find('.as-dropdown__list-item button');
      optionElement.click();

      await page.waitForChanges();

      expect(categoriesSelectedSpy).toHaveReceivedEventDetail(exampleOptions[0].value);
    });

    it('should open dropdown when control is clicked', async () => {
      const element = await page.find('as-dropdown');
      element.setProperty('options', exampleOptions);

      await page.waitForChanges();

      const controlElement = await page.find('.as-dropdown__control');
      await controlElement.click();

      await page.waitForChanges();

      const menuDropdown = await page.find('.as-dropdown');
      expect(menuDropdown).toHaveClass('as-dropdown--open');
    });

    it('should clear option when clear button is pressed', async () => {
      const element = await page.find('as-dropdown');
      element.setProperty('options', exampleOptions);
      element.setProperty('selectedOption', 'option2');
      element.setProperty('showClearButton', true);

      await page.waitForChanges();

      const clearButtonElement = await page.find('.as-dropdown__clear');
      clearButtonElement.click();

      await page.waitForChanges();

      const selectedOptions = await element.callMethod('getSelectedOption');

      expect(selectedOptions).toBeUndefined();
    });
  });
});

const exampleOptions = [
  { text: 'Option 1', value: 'option1' },
  { text: 'Option 2', value: 'option2' },
  { text: 'Option 3', value: 'option3' }
];
