import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/counter': {
        target: 'http://localhost:4000', // Adjust the port to match your backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/counter/, '/counter')
      }
    }
  }
});
