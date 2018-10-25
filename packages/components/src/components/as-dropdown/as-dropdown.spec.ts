import { Dropdown } from './as-dropdown';

describe('as-dropdown', () => {
  let dropdown;

  beforeEach(() => {
    dropdown = new Dropdown();
  });

  describe('onSelectionChanged', () => {
    describe('_selectFromValue', () => {
      it('should call `_selectFromValue`', () => {
        spyOn(dropdown, '_selectFromValue');
        dropdown.onSelectionChanged('a_value');
        expect(dropdown._selectFromValue).toHaveBeenCalled();
      });
    });

    describe('componentWillLoad', () => {
      it('should call `_selectFromValue`', () => {
        spyOn(dropdown, '_selectFromValue');
        dropdown.selectedOption = 'a_value';
        dropdown.componentWillLoad();
        expect(dropdown._selectFromValue).toHaveBeenCalled();
      });
    });
  });

  describe('_selectFromValue', () => {
    it('should reset internal `selectedOptionObject`object when called with no value', () => {
      dropdown.selectedOptionObject = {
        text: 'Looptroop',
        value: 'looptroop'
      };

      dropdown._selectFromValue(null);

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

      dropdown._selectFromValue(dropdown.options[1].value);

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

      dropdown._selectFromValue('a_totally_different_value');

      expect(dropdown.selectedOptionObject).toEqual({});

    });
  });

  describe('clearOption', () => {
    it('should close list, reset selectedOption and emit event', () => {
      spyOn(dropdown, '_closeList');
      spyOn(dropdown, '_emitOption');
      dropdown.selectedOption = 'something';

      dropdown.clearOption();

      expect(dropdown._closeList).toHaveBeenCalled();
      expect(dropdown._emitOption).toHaveBeenCalled();
      expect(dropdown.selectedOption).toBeNull();
    });
  });
});
