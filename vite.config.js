import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: '.',            // Explicitly sets the current folder as root
  publicDir: 'public',  // Explicitly sets the public folder
  server: {
    port: 5174,
    strictPort: true,   // Ensures Vite always uses exactly 5174
  },
});
