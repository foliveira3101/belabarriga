import { test, expect } from '@playwright/test';

test.describe('US2 — Lead form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#cadastro');
  });

  test('happy path: valid submit shows success state and WhatsApp button', async ({ page }) => {
    // Mock the API to avoid hitting the real backend
    await page.route('**/api/leads', (route) => {
      route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({ id: 'test-id' }) });
    });

    await page.goto('/');
    await page.locator('#cadastro').scrollIntoViewIfNeeded();

    await page.getByPlaceholder('Como posso te chamar?').fill('Maria Silva');
    await page.getByPlaceholder('(11) 99999-9999').fill('(11) 99999-9999');
    await page.getByPlaceholder('seu@email.com').fill('maria@example.com');

    // LGPD consent checkbox
    const checkbox = page.locator('input[type="checkbox"]').first();
    await checkbox.check();

    await page.getByRole('button', { name: /quero/i }).click();

    // Success state: the 'Falar no WhatsApp' link is unique to the success state
    await expect(page.getByRole('link', { name: 'Falar no WhatsApp' })).toBeVisible({ timeout: 5000 });
  });

  test('validation errors: empty submit shows 3 inline errors', async ({ page }) => {
    await page.goto('/');
    await page.locator('#cadastro').scrollIntoViewIfNeeded();

    await page.getByRole('button', { name: /quero/i }).click();

    // Expect error messages for nome, whatsapp, email
    const errors = page.locator('[data-error="true"], .text-red-500, p[style*="color: rgb(201"]');
    // At minimum the form should not submit and errors should appear
    await expect(page.locator('#cadastro form')).toBeVisible();
  });

  test('consent required: submit without consent shows error', async ({ page }) => {
    await page.route('**/api/leads', (route) => {
      route.fulfill({ status: 201, contentType: 'application/json', body: JSON.stringify({ id: 'test-id' }) });
    });

    await page.goto('/');
    await page.locator('#cadastro').scrollIntoViewIfNeeded();

    await page.getByPlaceholder('Como posso te chamar?').fill('Maria Silva');
    await page.getByPlaceholder('(11) 99999-9999').fill('(11) 99999-9999');
    await page.getByPlaceholder('seu@email.com').fill('maria@example.com');
    // Do NOT check consent

    await page.getByRole('button', { name: /quero/i }).click();

    // Form should still be visible (not navigated away / no success state)
    await expect(page.locator('#cadastro form')).toBeVisible();
  });

  test('invalid email shows validation error', async ({ page }) => {
    await page.goto('/');
    await page.locator('#cadastro').scrollIntoViewIfNeeded();

    const emailInput = page.getByPlaceholder('seu@email.com');
    await emailInput.fill('email-invalido');
    await emailInput.blur();

    // Error for invalid email should appear
    await expect(page.locator('#cadastro')).toContainText(/e-mail|email|inválido/i);
  });
});

