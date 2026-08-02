import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [],
    // exclude Playwright E2E tests from Vitest
    exclude: ['**/node_modules/**', '**/tests/e2e/**'],
  },
});
