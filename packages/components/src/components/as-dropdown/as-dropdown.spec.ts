import { Dropdown } from './as-dropdown';

describe('as-dropdown', () => {
  let dropdown;

  beforeEach(() => {
    dropdown = new Dropdown();
  });

  describe('onSelectionChanged', () => {
    it('should call `selectFromValue`', () => {
      spyOn(dropdown, 'selectFromValue');

      dropdown.onSelectionChanged('a_value');

      expect(dropdown.selectFromValue).toHaveBeenCalled();
    });
  });

  describe('componentWillLoad', () => {
    it('should call `selectFromValue`', () => {
      spyOn(dropdown, 'selectFromValue');
      dropdown.selectedOption = 'a_value';

      dropdown.componentWillLoad();

      expect(dropdown.selectFromValue).toHaveBeenCalled();
    });
  });

  describe('selectFromValue', () => {
    it('should reset internal `selectedOptionObject`object when called with no value', () => {
      dropdown.selectedOptionObject = {
        text: 'Looptroop',
        value: 'looptroop'
      };

      dropdown.selectFromValue(null);

      expect(dropdown.selectedOptionObject).toBe(null);
    });

    it('should set internal `selectedOptionObject`object with the proper object', () => {
      dropdown.options = [
        {
          text: 'Looptroop',
          value: 'looptroop'
        },
        {
          text: 'Reflection Eternal',
          value: 'reflection_eternal'
        }
      ];

      dropdown.selectFromValue(dropdown.options[1].value);

      expect(dropdown.selectedOptionObject).toEqual(dropdown.options[1]);
    });

    it('should not set internal `selectedOptionObject`object if the value is not there', () => {
      dropdown.options = [
        {
          text: 'Looptroop',
          value: 'looptroop'
        },
        {
          text: 'Reflection Eternal',
          value: 'reflection_eternal'
        }
      ];

      dropdown.selectFromValue('a_totally_different_value');

      expect(dropdown.selectedOptionObject).toEqual({});

    });
  });

  describe('clearOption', () => {
    it('should close list, reset selectedOption and emit event', () => {
      spyOn(dropdown, 'closeList');
      spyOn(dropdown, 'emitOption');
      dropdown.selectedOption = 'something';

      dropdown.clearOption();

      expect(dropdown.closeList).toHaveBeenCalled();
      expect(dropdown.emitOption).toHaveBeenCalled();
      expect(dropdown.selectedOption).toBeNull();
    });
  });
});
