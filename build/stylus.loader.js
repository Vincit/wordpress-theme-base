module.exports = {
  loader: 'stylus-loader',
  options: {
    import: [
      '~jeet/styl/index.styl',
    ],
    preferPathResolver: 'webpack',
  },
};
