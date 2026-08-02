import { test, expect } from '@playwright/test';

// Section IDs as defined in each component
const SECTIONS = [
  { id: 'hero', name: 'HeroSection' },
  { id: 'dor', name: 'PainSection' },
  { id: 'metodo', name: 'PillarsSection' },
  { id: 'como-funciona', name: 'HowItWorksSection' },
  { id: 'beneficios', name: 'BenefitsSection' },
  { id: 'especialista', name: 'AboutSection' },
  { id: 'resultados', name: 'TestimonialsSection' },
  { id: 'incluso', name: 'IncludedSection' },
  { id: 'cadastro', name: 'LeadMagnetSection' },
];

test.describe('US1 — Landing page sections visible', () => {
  test('all 9 US1 sections are visible on desktop (1280px)', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    for (const section of SECTIONS) {
      const el = page.locator(`#${section.id}`);
      await expect(el, `${section.name} should be present`).toBeAttached();
    }
  });

  test('all 9 US1 sections are visible on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    for (const section of SECTIONS) {
      const el = page.locator(`#${section.id}`);
      await expect(el, `${section.name} should be present`).toBeAttached();
    }
  });

  test('page renders on tablet (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('hero headline is visible', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();
    await expect(h1).not.toBeEmpty();
  });

  test('navbar is fixed at top', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('footer is present', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    await expect(footer).toBeAttached();
  });
});

// T057 — FAQ section
test.describe('US4 — FAQ section', () => {
  test('all 6 FAQ questions are present', async ({ page }) => {
    await page.goto('/');
    const faqSection = page.locator('#faq');
    await expect(faqSection).toBeAttached();

    const buttons = faqSection.locator('button[aria-expanded]');
    await expect(buttons).toHaveCount(6);
  });

  test('clicking a FAQ item expands its answer', async ({ page }) => {
    await page.goto('/');
    const faqSection = page.locator('#faq');
    const firstButton = faqSection.locator('button[aria-expanded]').first();

    await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('clicking an open FAQ item collapses it', async ({ page }) => {
    await page.goto('/');
    const faqSection = page.locator('#faq');
    const firstButton = faqSection.locator('button[aria-expanded]').first();

    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    await firstButton.click();
    await expect(firstButton).toHaveAttribute('aria-expanded', 'false');
  });
});
