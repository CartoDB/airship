import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-widget-selection', () => {
  let page: E2EPage;
  let element: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({ html: '<as-widget-selection></as-widget-selection>' });
    element = await page.find('as-widget-selection');
  });

  it('should render the correct selection', async () => {
    element.setProperty('selection', 'Hello-darkness');
    await page.waitForChanges();

    const actual = await page.find('.as-widget-selection__selection');

    expect(actual.innerText).toEqual('Hello-darkness');
  });

  it('should not render the clear text', async () => {
    element.setProperty('selection', 'Hello-darkness');
    await page.waitForChanges();

    const actual = await page.find('.as-widget-selection__clear');

    expect(actual).toBeFalsy();
  });

  it('should render the clear text', async () => {
    element.setProperty('selection', 'Hello-darkness');
    element.setProperty('showClear', 'true');
    await page.waitForChanges();

    const actual = await page.find('.as-widget-selection__clear');

    expect(actual).not.toBeFalsy();
    expect(actual.innerText).toBe('Clear selection');
  });

  it('should render a custom clear text', async () => {
    element.setProperty('selection', 'Hello-darkness');
    element.setProperty('showClear', 'true');
    element.setProperty('clearText', 'My-old-Friend');
    await page.waitForChanges();

    const actual = await page.find('.as-widget-selection__clear');

    expect(actual).not.toBeFalsy();
    expect(actual.innerText).toBe('My-old-Friend');
  });

  it('should trigger an event when clicking the clear', async () => {
    element.setProperty('selection', 'Hello-darkness');
    element.setProperty('showClear', 'true');
    await page.waitForChanges();

    const clearSpy = await element.spyOnEvent('clear');
    const actual = await page.find('.as-widget-selection__clear');

    expect(actual).not.toBeFalsy();

    await actual.click();

    expect(clearSpy).toHaveReceivedEvent();
  });

});
