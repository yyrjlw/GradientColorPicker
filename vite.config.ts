import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import UnoCSS from 'unocss/vite'

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      cssInjectedByJsPlugin({
        relativeCSSInjection: true
      }),
      UnoCSS()
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    build:
      mode === 'production'
        ? {
            cssCodeSplit: true,
            emptyOutDir: false,
            outDir: './lib',
            lib: {
              entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
              fileName: 'index',
              name: 'ColorPicker'
            },
            rollupOptions: {
              external: ['vue'],
              output: {
                globals: {
                  vue: 'Vue'
                }
              }
            }
          }
        : {
            outDir: 'dist'
          }
  }
})
