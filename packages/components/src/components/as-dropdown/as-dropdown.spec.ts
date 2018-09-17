import { TestWindow } from '@stencil/core/dist/testing';
import { Dropdown } from './as-dropdown';

describe('as-category-widget', () => {
  it('should build', () => {
    expect(new Dropdown()).toBeTruthy();
  });

  describe('Rendering', () => {
    let element: HTMLAsDropdownElement;
    let testWindow: TestWindow;

    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Dropdown],
        html: '<as-dropdown></as-dropdown>'
      });
    });

    it('should render properly', async () => {
      element.options = exampleOptions;
      element.selectedOption = 'option2';
      await testWindow.flush();

      expect(element).toMatchSnapshot();
    });

    it('should render clear button when showClearButton is true and an option is selected', async () => {
      element.options = exampleOptions;
      element.selectedOption = 'option2';
      element.showClearButton = true;
      await testWindow.flush();

      expect(element).toMatchSnapshot();
    });

    it('should show defaultText when there is no selected option', async () => {
      element.options = exampleOptions;
      element.defaultText = 'Dropdown';
      await testWindow.flush();

      expect(element).toMatchSnapshot();
    });
  });

  describe('Behaviour', () => {
    let element: HTMLAsDropdownElement;
    let testWindow: TestWindow;

    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Dropdown],
        html: '<as-dropdown></as-dropdown>'
      });
    });

    it('should emit an event containing selected option when option changes', async () => {
      element.options = exampleOptions;

      const optionChangedSpy = jest.fn();
      element.addEventListener('optionChanged', optionChangedSpy);
      await testWindow.flush();

      const optionElement = element.querySelector('.as-dropdown__list-item button') as HTMLButtonElement;
      optionElement.click();

      expect(optionChangedSpy).toHaveBeenCalled();
      expect(optionChangedSpy.mock.calls[0][0].detail).toEqual(exampleOptions[0].value);
    });

    it('should open dropdown when control is clicked', async () => {
      element.options = exampleOptions;
      await testWindow.flush();

      const controlElement = element.querySelector('.as-dropdown__control') as HTMLButtonElement;
      controlElement.click();

      await testWindow.flush();

      const menuDropdown = element.querySelector('.as-dropdown') as HTMLDivElement;
      expect(menuDropdown.classList.contains('as-dropdown--open')).toBe(true);
    });

    it('should clear option when clear button is pressed', async () => {
      element.options = exampleOptions;
      element.selectedOption = 'option2';
      element.showClearButton = true;
      await testWindow.flush();

      const clearButtonElement = element.querySelector('.as-dropdown__clear') as HTMLButtonElement;
      clearButtonElement.click();

      await testWindow.flush();

      expect(element.getSelectedOption()).toBeUndefined();
    });
  });
});

const exampleOptions = [
  { text: 'Option 1', value: 'option1' },
  { text: 'Option 2', value: 'option2' },
  { text: 'Option 3', value: 'option3' }
];
