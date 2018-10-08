import { TestWindow } from '@stencil/core/dist/testing';
import { StackedBarWidget } from './as-stacked-bar-widget';

describe('as-stacked-bar-widget', () => {
  let stackedBarWidget;

  beforeEach(() => {
    stackedBarWidget = new StackedBarWidget();
  });

  it('should build', () => {
    expect(stackedBarWidget).toBeTruthy();
  });

  describe('Propery handling', () => {
    let testWindow;
    beforeEach(() => testWindow = new TestWindow());
    it('should handle title attribute', async () => {
      const element = await testWindow.load({
        components: [StackedBarWidget],
        html: `<as-stacked-bar-widget title="Population Income"></as-stacked-bar-widget>`
      });
      expect(element).toMatchSnapshot();
    });

    it('should handle description attribute', async () => {
      const element = await testWindow.load({
        components: [StackedBarWidget],
        html: `<as-stacked-bar-widget description="fake-description-attr"></as-stacked-bar-widget>`
      });
      expect(element).toMatchSnapshot();
    });

    it('should handle showLegend attribute', async () => {
      const element = await testWindow.load({
        components: [StackedBarWidget],
        html: `<as-stacked-bar-widget show-legend="false"></as-stacked-bar-widget>`
      });
      expect(element).toMatchSnapshot();
    });

    it('should handle data attribute', async () => {
      const element = await testWindow.load({
        components: [StackedBarWidget],
        html: `<as-stacked-bar-widget></as-stacked-bar-widget>`
      });
      element.data = 'fake_data';
      expect(element).toMatchSnapshot();
    });

    it('should handle valuesInfo attribute', async () => {
      const element = await testWindow.load({
        components: [StackedBarWidget],
        html: `<as-stacked-bar-widget></as-stacked-bar-widget>`
      });
      element.valuesInfo = 'fake_valuesInfo';
      expect(element).toMatchSnapshot();
    });
  });
});
