import { resolve } from 'path';
import { defineConfig } from 'vite';
import { regExpMasterVitePlugin } from './src/plugin';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'regexp-master',
        fileName: 'regexp-master',
      },
      rollupOptions: {
        external: ['node:fs'],
      },
    },
    server: { https: {} },
    plugins: [regExpMasterVitePlugin()],
  };
});
