import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-responsive-content', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({ html: `<as-responsive-content>${domExample}</as-responsive-content>` });
  });

  describe('Rendering', () => {
    it('should render tabs based on content', async () => {
      const tabs: E2EElement = await page.find('.as-toolbar-tabs');
      const tabsHTML = tabs.innerHTML;

      expect(tabsHTML).toContain('Sidebar 0');
      expect(tabsHTML).toContain('Sidebar 1');
      expect(tabsHTML).toContain('Panel 0');
      expect(tabsHTML).toContain('Bottom Bar');
    });

    it('should render tabs even if footer is not available', async () => {
      page = await newE2EPage({ html: `<as-responsive-content>${noFooterExample}</as-responsive-content>` });

      const tabs: E2EElement = await page.find('.as-toolbar-tabs');
      const tabsHTML = tabs.innerHTML;

      expect(tabsHTML).toContain('Sidebar 0');
      expect(tabsHTML).toContain('Sidebar 1');
      expect(tabsHTML).toContain('Panel 0');
      expect(tabsHTML).not.toContain('Bottom Bar');
    });

    it('should not render tabs content is no content is available', async () => {
      page = await newE2EPage({ html: `<as-responsive-content></as-responsive-content>` });

      const tabs: E2EElement = await page.find('.as-toolbar-tabs');
      const tabsHTML = tabs.innerHTML;

      expect(tabsHTML).toEqual('');
    });
  });

  describe('Behaviour', () => {
    let tabs: E2EElement[];
    beforeEach(async () => {
      tabs = await page.findAll('.as-tabs__item');
    });
    it('should display the map-area by default', async () => {
      const mapAreaElement = await page.find('.as-map-area');
      expect(mapAreaElement).toHaveClass('as-map-area--visible');
    });

    it('should activate a sidebar when clicking on its tab', async () => {
      const leftSidebar = await page.find('.as-sidebar--left');
      tabs[1].click();

      await page.waitForChanges();
      expect(leftSidebar).toHaveClass('as-sidebar--visible');
    });

    it('should activate map panels when clicking on its tab', async () => {
      const panels = await page.find('.as-map-panels');
      tabs[3].click();

      await page.waitForChanges();
      expect(panels).toHaveClass('as-map-panels--visible');
    });

    it('should activate the footer when clicking on its tab', async () => {
      const footer = await page.find('.as-map-footer');
      tabs[4].click();

      await page.waitForChanges();
      expect(footer).toHaveClass('as-map-footer--visible');
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

const noFooterExample = `
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
  </main>

  <aside class="as-sidebar as-sidebar--right">Right Sidebar</aside>
`;
