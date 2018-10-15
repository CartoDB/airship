import { newE2EPage } from '@stencil/core/testing';

describe('as-infowindow', () => {
  describe('Rendering', () => {
    it('should render content', async () => {
      const page = await newE2EPage({ html: `
        <as-infowindow>
          Hello there!
        </as-infowindow>
      `});

      const element = await page.find('as-infowindow');
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should render content and image', async () => {
      const page = await newE2EPage({ html: `
        <as-infowindow src="general_kenobi.jpg">
          Hello there!
        </as-infowindow>
      `});

      const element = await page.find('as-infowindow');
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should render with only an image', async () => {
      const page = await newE2EPage({ html: `
        <as-infowindow src="general_kenobi.jpg"></as-infowindow>
      `});

      const element = await page.find('as-infowindow');
      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
