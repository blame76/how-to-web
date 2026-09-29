const { test, expect } = require('@playwright/test');

test('Navbar disclosure opens, closes with Escape and returns focus', async ({ page }) => {
  await page.goto('/elements/navigation/navbar/examples/with-disclosures.html');

  const trigger = page.getByRole('button', { name: /Bausteine/ });
  const panel = page.locator('#group-0');

  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(panel).toBeVisible();

  await trigger.press('Escape');

  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(panel).toBeHidden();
  await expect(trigger).toBeFocused();
});
