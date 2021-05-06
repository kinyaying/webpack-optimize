import babel from 'rollup-plugin-babel'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
// import typescript from '@rollup/typescript'
import { terser } from 'rollup-plugin-terser'
import postcss from 'rollup-plugin-postcss'
export default {
  input: './rollup/index1.js',
  output: {
    file: './bundle/bundle.js',
    format: 'iife', // 5种，amd,es，iife,umd,cjs
    name: 'calculator', //输出格式为iife或umd时，作为全局变量挂载在window上
    // globals: {
    //   lodash: '_',
    // },
  },
  plugins: [
    babel({
      exclude: /node_modules/,
      presets: [
        [
          '@babel/env',
          {
            modules: false,
          },
        ],
      ],
    }),
    resolve(),
    commonjs(),
    // terser(),
    postcss(),
  ],
  // external: ['lodash'],
}
