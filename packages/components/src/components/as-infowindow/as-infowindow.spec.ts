import { newSpecPage } from '@stencil/core/testing';
import { Infowindow } from './as-infowindow';

describe('as-infowindow', () => {
  describe('Rendering', () => {
    it('should render content', async () => {
      const page = await newSpecPage({
        components: [Infowindow],
        html: `
        <as-infowindow>Hello there!</as-infowindow>
      `});

      const element = page.root;
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should render content and image', async () => {
      const page = await newSpecPage({
        components: [Infowindow],
        html: `
        <as-infowindow src="general_kenobi.jpg">Hello there!</as-infowindow>
      `});

      const element = page.root;
      expect(element.outerHTML).toMatchSnapshot();
    });

    it('should render with only an image', async () => {
      const page = await newSpecPage({
        components: [Infowindow],
        html: `
        <as-infowindow src="general_kenobi.jpg"></as-infowindow>
      `});

      const element = page.root;
      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
