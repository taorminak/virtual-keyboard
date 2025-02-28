import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/virtual-keyboard/', 
  build: {
    outDir: 'dist',
  },
  plugins: [
    tailwindcss(),
  ],
  server: {
    open: true,
  },
});
