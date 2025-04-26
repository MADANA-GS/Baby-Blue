import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['854d-49-207-61-190.ngrok-free.app'], // ✅ Allow your ngrok URL
  },
})
