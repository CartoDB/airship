import { TestWindow } from '@stencil/core/dist/testing';
import { ApplicationContent } from './as-application';

describe('as-category-widget', () => {
  it('should build', () => {
    expect(new ApplicationContent()).toBeTruthy();
  });

  describe('Rendering', async () => {
    let element: HTMLAsApplicationContentElement;
    let testWindow: TestWindow;

    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [ApplicationContent],
        html: `<as-application-content>${DOMExample}</as-application-content>`
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

    it('should render child content inside .as-app-content', () => {
      const asAppContentNode = element.querySelector('.as-app-content');
      expect(asAppContentNode.innerHTML).toContain(DOMExample);
    });
  });

  describe('Behaviour', () => {
    let element: HTMLAsApplicationContentElement;
    let testWindow: TestWindow;

    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [ApplicationContent],
        html: `<as-application-content>${DOMExample}</as-application-content>`
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
      expect(leftSidebarNode).toMatchClasses(['as-sidebar', 'as-sidebar--left', 'as-sidebar--left--visible']);
    });
  });

  describe('Events', async () => {
    let element: HTMLAsApplicationContentElement;
    let testWindow: TestWindow;

    beforeEach(async () => {
      testWindow = new TestWindow();
      element = await testWindow.load({
        components: [ApplicationContent],
        html: `<as-application-content>${DOMExample}</as-application-content>`
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

const DOMExample = `
  <aside class="as-sidebar as-sidebar--left">Left Sidebar</aside>

  <div class="as-map-wrapper">
    <div class="as-map">
      <div id="map"></div>
      <div class="as-panels">
        <div class="as-panel as-panel--top as-panel--right">
          <div class="as-panel__element">Floating Panel</div>
        </div>
      </div>
    </div>

    <div class="as-bottom-bar">Bottom Bar</div>
  </div>

  <aside class="as-sidebar as-sidebar--right">Right Sidebar</aside>
`;
