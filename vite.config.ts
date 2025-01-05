import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            'chart.js',
            'react-chartjs-2',
            '@supabase/supabase-js',
            'firebase',
            'firebase-admin'
          ],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['@supabase/supabase-js', 'chart.js', 'react-chartjs-2'],
  },
});
