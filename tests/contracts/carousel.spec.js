const { test, expect } = require('@playwright/test');

test('Carousel changes one controlled slide and keeps focus on navigation control', async ({ page }) => {
  await page.goto('/elements/interactive/carousel/examples/editorial-story.html');

  const next = page.getByRole('button', { name: 'Nächster Slide' });
  const position = page.locator('[data-position]');

  await expect(position).toHaveText('1 von 4');
  await expect(page.locator('[role="group"][aria-label="1 von 4"]')).toBeVisible();

  await next.click();

  await expect(next).toBeFocused();
  await expect(position).toHaveText('2 von 4');
  await expect(page.locator('[role="group"][aria-label="1 von 4"]')).toBeHidden();
  await expect(page.locator('[role="group"][aria-label="2 von 4"]')).toBeVisible();

  const fourth = page.getByRole('button', { name: /Slide 4:/ });
  await fourth.click();

  await expect(position).toHaveText('4 von 4');
  await expect(fourth).toHaveAttribute('aria-pressed', 'true');
  await expect(next).toBeDisabled();
});
