import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-responsive-content', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({ html: `<as-responsive-content>${domExample}</as-responsive-content>` });
  });

  describe('Rendering', async () => {
    it('should render tabs based on content', async () => {
      const tabs: E2EElement = await page.find('.as-toolbar-tabs');
      const tabsHTML = tabs.innerHTML;

      expect(tabsHTML).toContain('Sidebar 0');
      expect(tabsHTML).toContain('Sidebar 1');
      expect(tabsHTML).toContain('Panel 0');
      expect(tabsHTML).toContain('Bottom Bar');
    });

    it('should render child content inside .as-content', async () => {
      /* tslint:disable */
      // DOM Example with spaces and line breaks removed
      const innerContent = '<aside class=\"as-sidebar as-sidebar--left\">Left Sidebar</aside><main class=\"as-main\"><div class=\"as-map-area\"><div id=\"map\"></div><div class=\"as-map-panels\"><div class=\"as-panel as-panel--top as-panel--right\"><div class=\"as-panel__element\">Floating Panel</div></div></div></div><div class=\"as-map-footer\">Bottom Bar</div></main><aside class=\"as-sidebar as-sidebar--right\">Right Sidebar</aside>';
      /* tslint:enable */

      const asAppContentNode = await page.find('.as-content');
      expect(asAppContentNode.innerHTML).toContain(innerContent);
    });
  });

  describe('Behaviour', async () => {
    it('should change active content when clicking tabs', async () => {
      const tabs: E2EElement[] = await page.findAll('.as-tabs__item');

      let mapTab = tabs[0];
      expect(mapTab).toHaveClasses(['as-tabs__item', 'as-tabs__item--active']);

      let leftSidebarTab = tabs[1];
      leftSidebarTab.click();

      await page.waitForChanges();

      const tabsAfterClick = await page.findAll('.as-tabs__item');
      const leftSidebarNode = await page.find('.as-sidebar.as-sidebar--left');

      mapTab = tabsAfterClick[0];
      leftSidebarTab = tabsAfterClick[1];

      expect(mapTab).toHaveClass('as-tabs__item');
      expect(leftSidebarTab).toHaveClasses(['as-tabs__item', 'as-tabs__item--active']);
      expect(leftSidebarNode).toHaveClasses(['as-sidebar', 'as-sidebar--left', 'as-sidebar--visible']);
    });
  });

  describe('Events', async () => {
    // TODO: Fix this break tests
    // it('should emit a "sectionChange" event when content changes in mobile view', async () => {
    //   const sectionChangedSpy = await page.spyOnEvent('sectionChange');
    //   await page.waitForChanges();

    //   const tabs: E2EElement[] = await page.findAll('.as-tabs__item');
    //   tabs.forEach((tab) => console.log(tab.outerHTML));

    //   const leftSidebarTab = tabs[1];
    //   await leftSidebarTab.tap();

    //   await page.waitForChanges();

    //   // expect(sectionChangedSpy).toHaveReceivedEventDetail({});
    // });
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
