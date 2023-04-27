import { defineConfig } from 'vite';
import { UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

const config: UserConfig = {
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    port: 8080,
    logLevel: 'debug',
  },
};

export default defineConfig(config);