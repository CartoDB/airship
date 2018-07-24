import { TestWindow } from '@stencil/core/dist/testing';
import { Toolbar } from './as-toolbar';

describe('as-switch', () => {
  it('should build', () => {
    expect(new Toolbar()).toBeTruthy();
  });

  describe('Behaviour', () => {
    let element: HTMLAsToolbarElement;
    let testWindow: TestWindow;

    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Toolbar],
        html: '<as-toolbar></as-toolbar>'
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
