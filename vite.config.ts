import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'regexp-master',
        fileName: 'regexp-master',
      },
    },
    server: { https: {} },
    plugins: [],
  };
});
