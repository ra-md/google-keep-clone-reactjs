import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'
import { configDefaults } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    }
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    exclude: [...configDefaults.exclude, '**/e2e/**']
  },
})
