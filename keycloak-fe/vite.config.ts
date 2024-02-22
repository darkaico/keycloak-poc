import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    cors: true, // Allow CORS for the development server
    proxy: {
      // "/documents": "http://127.0.0.1:5000/",
    },
    headers: {
      'Content-Security-Policy': "frame-ancestors 'self' http://0.0.0.0:8080",
      'X-Frame-Options': 'SAMEORIGIN',
    },
  },
  plugins: [react()],
})
