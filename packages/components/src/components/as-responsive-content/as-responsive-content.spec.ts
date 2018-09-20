import { TestWindow } from '@stencil/core/dist/testing';
import { ResponsiveContent } from './as-responsive-content';

describe('as-responsive-content', () => {
  it('should build', () => {
    expect(new ResponsiveContent()).toBeTruthy();
  });

  describe('Rendering', async () => {
    let element: HTMLAsResponsiveContentElement;
    let testWindow: TestWindow;

    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [ResponsiveContent],
        html: `<as-responsive-content>${domExample}</as-responsive-content>`
      });

      await testWindow.flush();
    });

    it('should render properly', () => {
      expect(element).toMatchSnapshot();
    });

    it('should render tabs based on content', () => {
      const tabs = element.querySelector('.as-toolbar-tabs');
      const tabsHTML = tabs.innerHTML;

      expect(tabsHTML).toContain('Sidebar 0');
      expect(tabsHTML).toContain('Sidebar 1');
      expect(tabsHTML).toContain('Panel 0');
      expect(tabsHTML).toContain('Bottom Bar');
    });

    it('should render child content inside .as-content', () => {
      const asAppContentNode = element.querySelector('.as-content');
      expect(asAppContentNode.innerHTML).toContain(domExample);
    });
  });

  describe('Behaviour', () => {
    let element: HTMLAsResponsiveContentElement;
    let testWindow: TestWindow;

    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [ResponsiveContent],
        html: `<as-responsive-content>${domExample}</as-responsive-content>`
      });

      await testWindow.flush();
    });

    it('should change active content when clicking tabs', async () => {
      const tabs = element.querySelectorAll('.as-tabs__item');

      let mapTab = tabs[0];
      expect(mapTab).toMatchClasses(['as-tabs__item', 'as-tabs__item--active']);

      let leftSidebarTab = element.querySelectorAll('.as-tabs__item')[1] as HTMLElement;
      leftSidebarTab.click();
      await testWindow.flush();

      const tabsAfterClick = element.querySelectorAll('.as-tabs__item');
      const leftSidebarNode = element.querySelector('.as-sidebar.as-sidebar--left');

      mapTab = tabsAfterClick[0];
      leftSidebarTab = tabsAfterClick[1] as HTMLElement;

      expect(mapTab).toMatchClasses(['as-tabs__item']);
      expect(leftSidebarTab).toMatchClasses(['as-tabs__item', 'as-tabs__item--active']);
      expect(leftSidebarNode).toMatchClasses(['as-sidebar', 'as-sidebar--left', 'as-sidebar--visible']);
    });
  });

  describe('Events', async () => {
    let element: HTMLAsResponsiveContentElement;
    let testWindow: TestWindow;

    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [ResponsiveContent],
        html: `<as-responsive-content>${domExample}</as-responsive-content>`
      });
    });

    it('should emit a "sectionChange" event when content changes in mobile view', async () => {
      const sectionChangeSpy = jest.fn();
      element.addEventListener('sectionChange', sectionChangeSpy);

      const leftSidebarTab = element.querySelectorAll('.as-tabs__item')[1] as HTMLElement;
      leftSidebarTab.click();

      await testWindow.flush();

      expect(sectionChangeSpy).toHaveBeenCalled();
    });
  });
});

const domExample = `
  <aside class="as-sidebar as-sidebar--left">Left Sidebar</aside>

  <main class="as-main">
    <div class="as-map-area">
      <div id="map"></div>
      <div class="as-map-panels">
        <div class="as-panel as-panel--top as-panel--right">
          <div class="as-panel__element">Floating Panel</div>
        </div>
      </div>
    </div>

    <div class="as-map-footer">Bottom Bar</div>
  </main>

  <aside class="as-sidebar as-sidebar--right">Right Sidebar</aside>
`;
