import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/crm': {
        target: 'http://localhost:9000', // Change to your backend's port
        changeOrigin: true,
        secure: false, 
      },
    },
  },
})
