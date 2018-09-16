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
      element.options = ['Option 1', 'Option 2', 'Option 3'];
      element.selectedOption = 'Option 2';
      await testWindow.flush();

      expect(element).toMatchSnapshot();
    });

    it('should render clear button when canClear is true and an option is selected', async () => {
      element.options = ['Option 1', 'Option 2', 'Option 3'];
      element.selectedOption = 'Option 2';
      element.canClear = true;
      await testWindow.flush();

      expect(element).toMatchSnapshot();
    });

    it('should show defaultText when there is no selected option', async () => {
      element.options = ['Option 1', 'Option 2', 'Option 3'];
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
      element.options = ['Option 1', 'Option 2', 'Option 3'];

      const optionChangedSpy = jest.fn();
      element.addEventListener('optionChanged', optionChangedSpy);
      await testWindow.flush();

      const optionElement = element.querySelector('.as-dropdown__list-item button') as HTMLButtonElement;
      optionElement.click();

      expect(optionChangedSpy).toHaveBeenCalled();
      expect(optionChangedSpy.mock.calls[0][0].detail).toEqual(element.options[0]);
    });

    it('should open dropdown when control is clicked', async () => {
      element.options = ['Option 1', 'Option 2', 'Option 3'];
      await testWindow.flush();

      const controlElement = element.querySelector('.as-dropdown__control') as HTMLButtonElement;
      controlElement.click();

      await testWindow.flush();

      const menuDropdown = element.querySelector('.as-dropdown') as HTMLDivElement;
      expect(menuDropdown.classList.contains('as-dropdown--open')).toBe(true);
    });

    it('should clear option when clear button is pressed', async () => {
      element.options = ['Option 1', 'Option 2', 'Option 3'];
      element.selectedOption = 'Option 2';
      element.canClear = true;
      await testWindow.flush();

      const clearButtonElement = element.querySelector('.as-dropdown__clear') as HTMLButtonElement;
      clearButtonElement.click();

      await testWindow.flush();

      expect(element.getSelectedOption()).toBe('');
    });
  });
});
