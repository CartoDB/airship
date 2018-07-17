import { TestWindow } from '@stencil/core/testing';
import { Switch } from './as-switch';

describe('as-switch', () => {
  let element: HTMLSwitchElement;
  let testWindow: TestWindow;

  beforeEach(async () => {
    testWindow = new TestWindow();
    element = await testWindow.load({
      components: [Switch],
      html: '<as-switch></as-switch>'
    });
  });

  it('should build', () => {
    expect(new Switch()).toBeTruthy();
  });

  describe('Rendering', () => {

  });

  describe('Behaviour', () => {
    it('should toggle when the switch is clicked', async () => {
      expect(element.querySelector('input').checked).toBeFalsy();
      element.click();
      await testWindow.flush();

      console.log(element.querySelector('input').checked);
      expect(element.querySelector('input').checked).toBeTruthy();
    });
  });
});
