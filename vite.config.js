import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  if(mode === 'docs') {
    return {
      plugins: [vue()],
      base: '/vue-glitched/',
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src')
        }
      },
      build: {
        minify: true,
        outDir: 'docs',
        rollupOptions: {
          input: {
            index: resolve(__dirname, 'index.html')
          },
          output: {
            entryFileNames: 'assets/[name].js',
            chunkFileNames: 'assets/[name].js',
            assetFileNames: 'assets/[name].[ext]'
          }
        }
      }
    }
  } else {
    return {
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src')
        }
      },
      build: {
        lib: {
          entry: resolve(__dirname, 'src/components/index.js'),
          name: 'vue-glitched',
          formats: ["es", "umd", "cjs"],
          filename: format => `vue-glitched.${format}.js`
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue'
            },
          },
        },
      },
      plugins: [vue()]
    }
  }
})
