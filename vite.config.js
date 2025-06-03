import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

import { resolve } from 'path'

const root = resolve(__dirname)
const srcPath = resolve(root, 'src')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar()
  ],
  resolve: {
    alias: {
      '@': srcPath,
      'src': srcPath,
      'stores': resolve(srcPath, 'stores'),
      'components': resolve(srcPath, 'components')
    }
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./test/setup.js'],
    alias: {
      '@': srcPath,
      'src': srcPath,
      'stores': resolve(srcPath, 'stores'),
      'components': resolve(srcPath, 'components')
    }
  }
})
