import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
    server: {
        proxy: {
        '/print': 'http://localhost:8080'
        }
    }
})
