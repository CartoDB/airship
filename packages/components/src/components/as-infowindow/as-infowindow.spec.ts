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

    it('should render content with custom width', async () => {
      const page = await newSpecPage({
        components: [Infowindow],
        html: `
        <as-infowindow width="calc(100vw - 90px)">Hello there!</as-infowindow>
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

    it('should render content and image with custom width', async () => {
      const page = await newSpecPage({
        components: [Infowindow],
        html: `
        <as-infowindow src="general_kenobi.jpg" width="calc(100% + 20px)">Hello there!</as-infowindow>
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

    it('should render with only an image with a custom width', async () => {
      const page = await newSpecPage({
        components: [Infowindow],
        html: `
        <as-infowindow src="general_kenobi.jpg" width="400px"></as-infowindow>
      `});

      const element = page.root;
      expect(element.outerHTML).toMatchSnapshot();
    });
  });
});
