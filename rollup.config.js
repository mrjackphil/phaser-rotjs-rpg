const html = require('@rollup/plugin-html')
const ts = require('@rollup/plugin-typescript')
const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const serve = require('rollup-plugin-serve')
const reload = require('rollup-plugin-livereload')

module.exports = {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'esm'
  },
  plugins: [
    ts(),
    resolve(),
    commonjs(),
    html({title: 'RPG'}),
    serve('dist'),
    reload('dist')
  ]
};
