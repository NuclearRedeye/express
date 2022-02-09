export default {
  input: './out/debug/index.js',
  output: {
    file: './out/release/index.js',
    format: 'es'
  },
  external: [ 'express', 'crypto' ]
};