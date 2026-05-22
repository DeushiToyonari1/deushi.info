import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/wp-json': {
        target: 'http://localhost:8888/wp',
        changeOrigin: true,
      },
      '/wp-content': {
        target: 'http://localhost:8888/wp',
        changeOrigin: true,
      },
    },
  },
})
