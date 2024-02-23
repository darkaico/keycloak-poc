import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    cors: true, // Allow CORS for the development server
    proxy: {
      // "/documents": "http://127.0.0.1:5000/",
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [react()],
})
