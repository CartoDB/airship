import { TestWindow } from '@stencil/core/dist/testing';
import { Switch } from './as-switch';

describe('as-switch', () => {
  it('should build', () => {
    expect(new Switch()).toBeTruthy();
  });

  describe('Behaviour', () => {
    let element: HTMLAsToolbarElement;
    let testWindow: TestWindow;

    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Switch],
        html: '<as-switch></as-switch>'
      });
    });

    it('should emit an event with current status when component toggles', () => {
      const spy = jest.fn();
      element.addEventListener('onToggle', spy);

      element.querySelector('input').click();

      expect(spy).toHaveBeenCalled();
      expect(spy.mock.calls[0][0].detail).toBe(true);
    });
  });
});
