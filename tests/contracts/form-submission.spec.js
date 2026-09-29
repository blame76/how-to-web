const { test, expect } = require('@playwright/test');

const path = '/patterns/form-submission/examples/contact-message.html';

test('Form Submission exposes pending and moves successful completion focus to the result heading', async ({ page }) => {
  await page.goto(path);

  const form = page.locator('[data-form]');
  const submit = page.locator('[data-submit]');

  await submit.click();

  await expect(form).toHaveAttribute('aria-busy', 'true', { timeout: 300 });
  await expect(submit).toHaveAttribute('aria-disabled', 'true', { timeout: 300 });
  await expect(submit).toBeFocused({ timeout: 300 });
  await expect(page.getByRole('button', { name: 'Eingabe korrigieren' })).toBeDisabled();

  const resultTitle = page.getByRole('heading', { name: 'Nachricht angekommen.' });
  await expect(resultTitle).toBeVisible();
  await expect(resultTitle).toBeFocused();
});

test('Form Submission validation error preserves values and focuses the affected field', async ({ page }) => {
  await page.goto(path);

  const email = page.getByLabel('E-Mail');
  await email.fill('mira@example.com');

  await page.getByRole('button', { name: 'Eingabe korrigieren' }).click();
  await page.getByRole('button', { name: 'Nachricht senden' }).click();

  await expect(email).toHaveAttribute('aria-invalid', 'true');
  await expect(email).toHaveValue('mira@example.com');
  await expect(email).toBeFocused();
  await expect(page.locator('[data-email-error]')).toContainText('Bitte verwende eine andere E-Mail-Adresse.');
});

test('Form Submission service failure is not presented as a field error', async ({ page }) => {
  await page.goto(path);

  const email = page.getByLabel('E-Mail');

  await page.getByRole('button', { name: 'Dienst nicht erreichbar' }).click();
  await page.getByRole('button', { name: 'Nachricht senden' }).click();

  const resultTitle = page.getByRole('heading', { name: 'Die Nachricht konnte gerade nicht verarbeitet werden.' });
  await expect(resultTitle).toBeVisible();
  await expect(resultTitle).toBeFocused();
  await expect(email).not.toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByRole('button', { name: 'Eingaben ansehen' })).toBeVisible();
});

test('Form Submission unknown outcome does not claim definite failure or offer blind retry', async ({ page }) => {
  await page.goto(path);

  await page.getByRole('button', { name: 'Ausgang unklar' }).click();
  await page.getByRole('button', { name: 'Nachricht senden' }).click();

  const resultTitle = page.getByRole('heading', { name: 'Wir können gerade nicht sicher sagen, ob die Nachricht angekommen ist.' });
  await expect(resultTitle).toBeVisible();
  await expect(page.locator('[data-result-body]')).toContainText('nicht blind empfohlen');
  await expect(page.getByRole('button', { name: /noch einmal|retry/i })).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Eingaben ansehen' })).toBeVisible();
});
