import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import styleImport from 'vite-plugin-style-import';

export default defineConfig({
  server: {
    port: 9999,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'electron/dist',
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  logLevel: 'info',
  base: "./",
  plugins: [
    vue(),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            name = name.slice(3);
            return `element-plus/packages/theme-chalk/src/${name}.scss`;
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`;
          },
        },
      ],
    }),
  ],
});
