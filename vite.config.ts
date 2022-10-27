/* eslint-disable import/no-extraneous-dependencies */
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import eslintPlugin from '@nabla/vite-plugin-eslint';
import react from '@vitejs/plugin-react';
import sassDts from 'vite-plugin-sass-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => ({
  plugins: [eslintPlugin(), react(), sassDts(), tsconfigPaths()],
  test: {
    clearMocks: true,
    css: false,
    environment: 'jsdom',
    globals: true,
    include: ['src/**/__tests__/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
    setupFiles: ['./src/setupTests.ts'],
  },
}));
