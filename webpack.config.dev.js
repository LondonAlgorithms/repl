const getConfig = require('hjs-webpack');

const config = getConfig({
  in: 'index.js',
  out: 'public',
  clearBeforeBuild: true
});

module.exports = config;
