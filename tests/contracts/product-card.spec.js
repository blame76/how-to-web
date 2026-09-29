const { test, expect } = require('@playwright/test');

test('Product Card image switching preserves card geometry and pressed state', async ({ page }) => {
  await page.goto('/blocks/product-card/examples/premium-retail.html');

  const card = page.locator('.product-card');
  await expect(card).toBeVisible();

  const before = await card.boundingBox();
  expect(before).not.toBeNull();

  const detail = page.getByRole('button', { name: 'Detailansicht anzeigen' });
  await detail.click();

  await expect(detail).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('[data-product-media] img')).toHaveAttribute('alt', /Detailansicht/);

  const after = await card.boundingBox();
  expect(after).not.toBeNull();
  expect(Math.abs(after.width - before.width)).toBeLessThanOrEqual(1);
  expect(Math.abs(after.height - before.height)).toBeLessThanOrEqual(1);

  const moon = page.getByRole('button', { name: 'Getragen, Rückseite anzeigen' });
  await moon.click();
  await expect(moon).toHaveAttribute('aria-pressed', 'true');
  await expect(detail).toHaveAttribute('aria-pressed', 'false');
});
