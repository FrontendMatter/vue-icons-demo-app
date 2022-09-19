import vue from 'rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import commonjs from '@rollup/plugin-commonjs'
import css from 'rollup-plugin-css-only'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

const path = require('path')
const customResolver = resolve({
  extensions: ['.js', '.vue']
})

const plugins = [
  peerDepsExternal(),
  alias({
    entries: [
      {
        find: '~',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  }),
  resolve({
    extensions: ['.js', '.vue']
  }),
  commonjs(),
  vue({
    css: false,
    style: {
      preprocessOptions: {
        scss: {
          includePaths: ['node_modules']
        }
      }
    }
  }),
  css({ 
    output: 'vue-icons-demo-app.css'
  })
]

export default [
  // ESM
  {
    input: 'src/app-icons.js',
    output: {
      format: 'esm',
      file: 'dist/vue-icons-demo-app.esm.js'
    },
    plugins
  }
]