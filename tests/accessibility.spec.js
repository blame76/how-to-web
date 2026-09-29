const { test, expect } = require('@playwright/test');
const AxeBuilder = require('@axe-core/playwright').default;

const references = [
  ['/blocks/product-card/', 'Product Card'],
  ['/elements/navigation/navbar/', 'Navbar'],
  ['/elements/interactive/carousel/', 'Carousel'],
  ['/elements/interactive/dialog/', 'Dialog'],
  ['/elements/navigation/mega-menu/', 'Mega Menu'],
  ['/elements/interactive/combobox/', 'Combobox'],
  ['/patterns/form-submission/', 'Form Submission'],
];

for (const [path, label] of references) {
  test(`${label} has no automatically detectable WCAG A/AA violations`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });
}
