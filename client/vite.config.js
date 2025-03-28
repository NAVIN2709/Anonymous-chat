import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/',  // Ensure correct paths in production
  server: {
    port: 5173,  // Local development port
  },
  build: {
    outDir: 'dist',  // Output folder for Render
    sourcemap: true,  // Helps with debugging
  }
});
