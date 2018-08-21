import { TestWindow } from '@stencil/core/dist/testing';
import { Infowindow } from './as-infowindow';

describe('as-infowindow', () => {
  it('should build', () => {
    expect(new Infowindow()).toBeTruthy();
  });

  describe('Rendering', () => {
    let element: HTMLAsCategoryWidgetElement;
    let testWindow: TestWindow;

    it('should render content', async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Infowindow],
        html: `
          <as-infowindow>
            Hello there!
          </as-infowindow>
        `
      });

      expect(element).toMatchSnapshot();
    });

    it('should render content and image', async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Infowindow],
        html: `
          <as-infowindow src="general_kenobi.jpg">
            Hello there!
          </as-infowindow>
        `
      });

      expect(element).toMatchSnapshot();
    });

    it('should render with only an image', async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [Infowindow],
        html: `
          <as-infowindow src="general_kenobi.jpg"></as-infowindow>
        `
      });

      expect(element).toMatchSnapshot();
    });
  });
});
