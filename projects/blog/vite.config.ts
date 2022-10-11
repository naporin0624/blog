/// <reference types='vitest' />
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'

export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  build: {
    emptyOutDir: true,
    outDir: join(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '~': join(__dirname, 'src/')
    }
  },
  server: {
    port: 3001,
    watch: {
      usePolling: true
    }
  },
})