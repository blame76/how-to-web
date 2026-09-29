const { test, expect } = require('@playwright/test');

test('Combobox keeps active option separate from committed value', async ({ page }) => {
  await page.goto('/elements/interactive/combobox/');

  const input = page.locator('[data-lab-input]');
  const selected = page.locator('[data-state-selected]');

  await input.focus();
  await input.press('ArrowDown');

  await expect(input).toBeFocused();
  await expect(input).toHaveAttribute('aria-expanded', 'true');
  await expect(input).toHaveAttribute('aria-activedescendant', /lab-option-/);
  await expect(selected).toHaveText('null');

  await input.press('ArrowDown');
  await input.press('Escape');

  await expect(input).toHaveAttribute('aria-expanded', 'false');
  await expect(input).not.toHaveAttribute('aria-activedescendant', /.+/);
  await expect(selected).toHaveText('null');

  await input.press('ArrowDown');
  await input.press('Enter');

  await expect(input).toBeFocused();
  await expect(input).toHaveValue('Signal Ring');
  await expect(selected).toHaveText('"Signal Ring"');
  await expect(input).toHaveAttribute('aria-expanded', 'false');
});
