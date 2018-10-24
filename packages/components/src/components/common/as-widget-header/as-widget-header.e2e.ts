import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-widget-header', () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({ html: '<as-widget-header></as-widget-header>' });
    element = await page.find('as-widget-header');
  });

  it('should render the correct header', async () => {
    element.setProperty('header', 'fake-header');
    await page.waitForChanges();

    const actual = await page.find('.as-widget-header__header');

    expect(actual.innerText).toEqual('fake-header');
  });

  it('should display the error text in subheader when header has error attribute', async () => {
    element.setProperty('header', 'fake-header');
    element.setProperty('subheader', 'fake-subheader');
    element.setProperty('error', 'fake-error');
    await page.waitForChanges();

    const actual = await page.find('.as-widget-header__subheader');

    expect(actual.innerText).toEqual('fake-error');
  });

  it('should display "LOADING" in subheader when header is loading flag', async () => {
    element.setProperty('header', 'fake-header');
    element.setProperty('subheader', 'fake-subheader');
    element.setProperty('isLoading', true);
    await page.waitForChanges();

    const actual = await page.find('.as-widget-header__subheader');

    expect(actual.innerText).toEqual('LOADING');
  });

  it('should display "NO DATA AVAILABLE" in subheader when header has no data flag', async () => {
    element.setProperty('header', 'fake-header');
    element.setProperty('subheader', 'fake-subheader');
    element.setProperty('isEmpty', true);
    await page.waitForChanges();

    const actual = await page.find('.as-widget-header__subheader');

    expect(actual.innerText).toEqual('NO DATA AVAILABLE');
  });

});
