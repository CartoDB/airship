import { TestWindow } from '@stencil/core/dist/testing';
import { RangeSlider } from './as-range-slider';

describe('as-range-slider', () => {
  it('should build', () => {
    expect(new RangeSlider()).toBeTruthy();
  });

  describe('logic', () => {
    let rangeSlider;

    beforeEach(async () => {
      rangeSlider = new RangeSlider();
    });

    it('should have default values', () => {
      expect(rangeSlider.minValue).toEqual(0);
      expect(rangeSlider.maxValue).toEqual(10);
    });

    // it('should honor min and max values when setting its range', () => {
    //   rangeSlider.range = [0, 10];
    //   const outOfBoundsRange = () => {
    //     rangeSlider.range = [-1, 9];
    //   };
    //   expect(outOfBoundsRange).toThrow();
    // });
  });

  describe('rendering', () => {
    let element: HTMLAsRangeSliderElement;
    let testWindow: TestWindow;


    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [RangeSlider],
        html: '<as-range-slider></as-range-slider>'
      });
    });

    // it('should render 1 thumbs + 1 bar (with just 1 value)', async () => {
    //   element.value = 5;
    //   await testWindow.flush();
    //   console.log('simple: ', element.innerHTML);

    //   expect(element.querySelectorAll('as-range-slider-thumb').length).toEqual(1);
    //   expect(element.querySelectorAll('as-range-slider-bar').length).toEqual(1);
    // });

    // it('should render 2 thumbs + 1 bar (with range values)', async () => {
    //   element.range = [2, 4];
    //   await testWindow.flush();

    //   console.log('double: ', element.innerHTML);

    //   const thumbs = element.querySelectorAll('as-range-slider-thumb');
    //   expect(thumbs.length).toEqual(2);

    //   const bar = element.querySelectorAll('as-range-slider-bar');
    //   expect(bar.length).toEqual(1);
    // });

  });

  // describe('events', () => { });
});