const getConfig = require('hjs-webpack');

const config = getConfig({
  in: 'examples',
  out: 'public',
  clearBeforeBuild: '!(images)'
});

module.exports = config;
