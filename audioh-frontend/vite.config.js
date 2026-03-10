import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        secure: false,
        timeout: 120000,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }, // <--- ADD THIS MISSING COMMA HERE

  build: {
    rollupOptions: {
      output: {
        assetFileNames: '[name]-[hash][extname]'
      }
    }
  }
})