const { test, expect } = require('@playwright/test');

test('Dialog sets deliberate initial focus and returns it after Escape', async ({ page }) => {
  await page.goto('/elements/interactive/dialog/examples/information.html');

  const open = page.getByRole('button', { name: 'Information öffnen' });
  const dialog = page.getByRole('dialog');
  const title = page.getByRole('heading', { name: /Was ändert sich mit Build DNA/ });

  await open.click();

  await expect(dialog).toBeVisible();
  await expect(title).toBeFocused();

  await page.keyboard.press('Escape');

  await expect(dialog).toBeHidden();
  await expect(open).toBeFocused();
});
