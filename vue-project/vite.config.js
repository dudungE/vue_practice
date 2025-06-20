import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    proxy: {
      '/main': {
        target: 'http://localhost:8091',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
