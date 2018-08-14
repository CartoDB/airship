import { TestWindow } from '@stencil/core/dist/testing';
import { RangeSlider } from './as-range-slider';

describe('as-range-slider', () => {
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

  describe('Rendering', () => {
    let element: HTMLAsRangeSliderElement;
    let testWindow: TestWindow;

    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [RangeSlider],
        html: '<as-range-slider></as-range-slider>'
      });
    });

    it('should render without parameters, using defaults', async () => {
      await testWindow.flush();

      expect(element).toMatchSnapshot();
    });

    it('should render 1 thumb + 1 bar when using a value', async () => {
      element.value = 5;
      element.minValue = 0;
      element.maxValue = 10;
      element.step = 1;
      await testWindow.flush();

      expect(element).toMatchSnapshot();
    });

    it('should render 2 thumbs + 1 bar when using a range', async () => {
      element.range = [2, 4];
      element.minValue = 2;
      element.maxValue = 20;
      element.step = 2;
      await testWindow.flush();

      expect(element).toMatchSnapshot();
    });

    it('can be rendered disabled', async () => {
      element.disabled = true;
      await testWindow.flush();

      expect(element).toMatchSnapshot();
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
