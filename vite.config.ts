import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/mart-for-you/",
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    // Removed manualChunks to avoid potential loading issues
  },
})
