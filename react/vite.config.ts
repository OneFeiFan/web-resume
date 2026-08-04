import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cloudflare Pages deploys react/dist as site root, so always use '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
