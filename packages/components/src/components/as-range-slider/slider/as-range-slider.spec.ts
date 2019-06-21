import { RangeSlider } from './as-range-slider';

/**
 * Commented until we can deprecate the prop "draggable" because stencil is throwing an error when
 * there's a warning on the build, apparently
 */
xdescribe('as-range-slider', () => {
  it('should build', () => {
    expect(new RangeSlider()).toBeTruthy();
  });

  describe('Logic', () => {
    let rangeSlider;

    beforeEach(async () => {
      rangeSlider = new RangeSlider();
    });

    it('should have default min and max values', () => {
      expect(rangeSlider.minValue).toEqual(0);
      expect(rangeSlider.maxValue).toEqual(10);
    });

    it('should emit a change event on thumb move', async () => {
      rangeSlider.minValue = 0;
      rangeSlider.maxValue = 1000;
      rangeSlider.range = [500, 600];

      const onChangeSpy = jest.fn();
      rangeSlider.change = { emit: onChangeSpy };

      rangeSlider._updateThumbs(); // >> ctor ?
      const [leftThumb, rightThumb] = rangeSlider.thumbs;

      const maxPercentage = 100;
      rangeSlider._onThumbMove(rightThumb, maxPercentage);
      expect(onChangeSpy).toHaveBeenCalledWith([500, 1000]);

      const minPercentage = 0;
      rangeSlider._onThumbMove(leftThumb, minPercentage);
      expect(onChangeSpy).toHaveBeenCalledWith([0, 1000]);
    });

    it('should take steps into account', async () => {
      rangeSlider.minValue = 0;
      rangeSlider.maxValue = 100;
      rangeSlider.step = 10;
      rangeSlider.value = 20;

      const onChangeSpy = jest.fn();
      rangeSlider.change = { emit: onChangeSpy };

      rangeSlider._updateThumbs(); // >> ctor ?
      const [thumb] = rangeSlider.thumbs;

      rangeSlider._onThumbMove(thumb, 27);
      expect(onChangeSpy).lastCalledWith([30]);

      rangeSlider._onThumbMove(thumb, 24);
      expect(onChangeSpy).lastCalledWith([20]);

      rangeSlider._onThumbMove(thumb, 100);
      expect(onChangeSpy).lastCalledWith([100]);
    });

    it('should emit a change event on bar move', async () => {
      rangeSlider.minValue = 0;
      rangeSlider.maxValue = 1000;
      rangeSlider.range = [500, 600];

      const onChangeSpy = jest.fn();
      rangeSlider.change = { emit: onChangeSpy };

      rangeSlider._updateThumbs();

      rangeSlider._onBarMove({ detail: [40, 50] });
      expect(onChangeSpy).toHaveBeenCalledWith([400, 500]);
    });
  });

  describe('Validation', async () => {
    let element: RangeSlider;

    beforeEach(async () => {
      element = new RangeSlider();
    });

    it('should honor min and max values when setting a value', async () => {
      element.minValue = 50;
      element.maxValue = 100;

      const outOfBounds = () => {
        element.validateValue(2);
      };

      expect(outOfBounds).toThrow(); // TODO this doesn't work, despite of new Error inside a Watch
    });
  });
});
