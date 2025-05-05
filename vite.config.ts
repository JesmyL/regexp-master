import { resolve } from 'path';
import { defineConfig } from 'vite';
import { regExpertVitePlugin } from './src/plugin';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'regexpert',
        fileName: 'regexpert',
      },
      rollupOptions: {
        external: ['node:fs'],
      },
    },
    server: { https: {} },
    plugins: [regExpertVitePlugin()],
  };
});
