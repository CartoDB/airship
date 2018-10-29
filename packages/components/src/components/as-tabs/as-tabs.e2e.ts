import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe.only('as-tabs', () => {
  let page: E2EPage;

  it('should show only the first tab by default', async () => {
    page = await newE2EPage({
      html: `
      <as-tabs>
        <div role="tabpanel">DIV0</div>
        <div role="tabpanel">DIV1</div>
        <div role="tabpanel">DIV2</div>
      </as-tabs>`
    });

    const actual = await _getTextFromTheVisibleTab(page);

    expect(actual).toEqual('DIV0');
  });

  it('should only the selected tab when the selected attribute is given', async () => {
    page = await newE2EPage({
      html: `
      <as-tabs active-tab="2">
        <div role="tabpanel">DIV0</div>
        <div role="tabpanel">DIV1</div>
        <div role="tabpanel">DIV2</div>
      </as-tabs>`
    });

    const actual = await _getTextFromTheVisibleTab(page);

    expect(actual).toEqual('DIV2');
  });

  it('should render titles by default', async () => {
    page = await newE2EPage({
      html: `
      <as-tabs active-tab="2">
        <div role="tabpanel">DIV0</div>
        <div role="tabpanel">DIV1</div>
        <div role="tabpanel">DIV2</div>
      </as-tabs>`
    });

    const actual = await _getTextFromTabsMenu(page);

    expect(actual).toEqual(' Tab 0  Tab 1  Tab 2 ');
  });

  it('should render custom titles when data-title is given in the tab', async () => {
    page = await newE2EPage({
      html: `
      <as-tabs active-tab="2">
        <div data-title="Map" role="tabpanel">DIV0</div>
        <div role="tabpanel">DIV1</div>
        <div data-title="Sidebar" role="tabpanel">DIV2</div>
      </as-tabs>`
    });

    const actual = await _getTextFromTabsMenu(page);
    expect(actual).toEqual(' Map  Tab 1  Sidebar ');
  });

  it('should change the selected tab when the nav button is clicked', async () => {
    page = await newE2EPage({
      html: `
      <as-tabs>
        <div role="tabpanel">DIV0</div>
        <div role="tabpanel">DIV1</div>
        <div role="tabpanel">DIV2</div>
      </as-tabs>`
    });

    await _clickOnTab(page, 2);
    const actual = await _getTextFromTheVisibleTab(page);

    expect(actual).toEqual('DIV1');
  });
});


// "Page Object" functions

async function _getTextFromTheVisibleTab(page: E2EPage): Promise<string> {
  await page.waitForChanges();
  const visibleTab = await page.find('[role="tabpanel"]:not([hidden="hidden"]');
  return visibleTab.innerText;
}

async function _getTextFromTabsMenu(page: E2EPage): Promise<string> {
  await page.waitForChanges();
  const tabList = await page.find('[role="tablist"]');
  return tabList.innerText;
}

// Since us used on a css selector, index count starts by 1.
async function _clickOnTab(page: E2EPage, index: number) {
  await page.waitForChanges();
  await page.click(`[role="tab"]:nth-child(${index})`);
  await page.waitForChanges();
}
