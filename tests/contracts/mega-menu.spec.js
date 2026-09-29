const { test, expect } = require('@playwright/test');

test('Mega Menu disclosure works without hover and Escape returns focus', async ({ page }) => {
  await page.goto('/elements/navigation/mega-menu/examples/grouped-links.html');

  const trigger = page.getByRole('button', { name: 'Untermenü Platform öffnen' });
  const panel = page.locator('#panel-platform');

  await trigger.click();

  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(panel).toBeVisible();

  await trigger.press('Escape');

  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
});
