import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({

  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    // local dev: forward API calls to the live backend
    proxy: {
      '/api': {
        target: 'https://eliospk.com',
        changeOrigin: true,
      },
    },
  },
})
