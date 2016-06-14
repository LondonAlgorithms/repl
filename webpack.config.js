const NODE_ENV = process.env.NODE_ENV;
const getConfig = require('hjs-webpack');

const config = getConfig({
  in: 'index.js',
  out: 'build/umd',
  clearBeforeBuild: true,
  devServer: {
    hot: false
  }
});

if (NODE_ENV === 'production') {
  config.output.libraryTarget = 'umd';
  config.output.library = 'algo-repl';
}

module.exports = config;
