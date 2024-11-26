// postcss.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ],
});
