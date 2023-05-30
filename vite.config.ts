import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import path from 'path';

export default ({ mode }) => {
  console.log('mode', loadEnv(mode, process.cwd()).VITE_BASE_URL);

  return defineConfig({
    plugins: [vue(), AutoImport()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  });
};
