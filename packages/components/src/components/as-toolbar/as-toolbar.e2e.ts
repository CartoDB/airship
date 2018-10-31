import { E2EPage, newE2EPage } from '@stencil/core/testing';

describe('as-toolbar', () => {
  let page: E2EPage;
  beforeEach(async () => {
    page = await newE2EPage({
      html: `
        <as-toolbar>
          <div href="#" class="as-toolbar__item">LOGO</div>
          <nav class="as-toolbar__actions">
            <ul>
              <li>
                <a href="#" class="as-toolbar__item">Link 1</a>
              </li>
              <li>
                <a href="#" class="as-toolbar__item">Link 2</a>
              </li>
            </ul>
          </nav>
        </as-toolbar>`
    });
  });

  describe('when the screen is small', () => {
    beforeEach(async () => {
      await page.setViewport({
        height: 800,
        width: 1200
      });
    });

    it('should have toolbar actions hidden by default', async () => {
      const actual = await page.find('.as-toolbar__actions');

      expect(actual).not.toHaveClass('as-toolbar__actions--visible');
    });

    it('should show toolbar actions when toggle button is clicked', async () => {
      page.click('.as-toolbar__toggle');
      await page.waitForChanges();

      const actual = await page.find('.as-toolbar__actions');

      expect(actual).toHaveClass('as-toolbar__actions--visible');
    });
  });
});
