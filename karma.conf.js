module.exports = function (config) {
  config.set({
    frameworks: ['mocha'],
    files: [
      'test/*.js'
    ],
    preprocessors: {
      'test/*.js': ['webpack', 'sourcemap']
    },
    webpack: require('./webpack.config.js'),
    webpackMiddleware: {
      stats: 'errors-only'
    },
    reporters: ['spec'],
    browsers: ['Chrome']
  });
}
