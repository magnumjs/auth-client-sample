import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'; // Import the path module

export default defineConfig({
    resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Alias "@" to the "src" directory
    },
  },
  plugins: [react()]
})
