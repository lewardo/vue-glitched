import { resolve } from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import banner from 'vite-plugin-banner'

import pkg from './package.json'


// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  if(mode === 'docs') {
    return {
      plugins: [
        vue(), 
        banner({
          outDir: 'docs',
          content: `/*
 * vue-glitched v${pkg.version}
 *
 * Copyright (c) 2023 lewardo (https://github.com/lewardo)
 * SPDX-License-Identifier: GPL-3.0+                                  
 *                       _ _ _       _         _ 
 *   _ _ _ _ ___ ___ ___| |_| |_ ___| |_ ___ _| |
 *  | | | | | -_|___| . | | |  _|  _|   | -_| . |
 *   \\_/|___|___|   |_  |_|_|_| |___|_|_|___|___|
 *                  |___|                        
 */`
        })
      ],      
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
      plugins: [
        vue(), 
        banner({
          content: `/*
 * vue-glitched v${pkg.version}
 *
 * Copyright (c) 2023 lewardo (https://github.com/lewardo)
 * SPDX-License-Identifier: GPL-3.0+                                  
 *                       _ _ _       _         _ 
 *   _ _ _ _ ___ ___ ___| |_| |_ ___| |_ ___ _| |
 *  | | | | | -_|___| . | | |  _|  _|   | -_| . |
 *   \\_/|___|___|   |_  |_|_|_| |___|_|_|___|___|
 *                  |___|                        
 */`
        })
      ],
      resolve: {
        alias: {
          '@': resolve(__dirname, 'src')
        }
      },
      publicDir: false,
      build: {
        lib: {
          entry: resolve(__dirname, 'src/components/index.js'),
          name: 'vue-glitched',
          formats: ["es", "umd"],
          filename: format => `vue-glitched.${format}.js`
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
    }
  }
})
