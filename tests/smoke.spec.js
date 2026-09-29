const { test, expect } = require('@playwright/test');

const references = [
  ['/blocks/product-card/', 'Product Card'],
  ['/elements/navigation/navbar/', 'Navbar'],
  ['/elements/interactive/carousel/', 'Carousel'],
  ['/elements/interactive/dialog/', 'Dialog'],
  ['/elements/navigation/mega-menu/', 'Mega Menu'],
  ['/elements/interactive/combobox/', 'Combobox'],
  ['/patterns/form-submission/', 'Form Submission'],
];

for (const [path, heading] of references) {
  test(`${heading} reference loads without page errors`, async ({ page }) => {
    const pageErrors = [];
    page.on('pageerror', error => pageErrors.push(error.message));

    const response = await page.goto(path);

    expect(response?.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
    expect(pageErrors).toEqual([]);
  });
}

test.describe('320 CSS px reflow smoke', () => {
  test.use({ viewport: { width: 320, height: 900 } });

  for (const [path, heading] of references) {
    test(`${heading} does not create page-level horizontal overflow`, async ({ page }) => {
      await page.goto(path);
      await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();

      const overflow = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));

      expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth + 1);
    });
  }
});
