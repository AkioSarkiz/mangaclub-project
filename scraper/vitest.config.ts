import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    testTimeout: 10_000,
    coverage: {
      provider: 'istanbul', // or 'v8'
    },
  },
});
