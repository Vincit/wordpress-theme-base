const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const parts = require('./webpack.parts');
const paths = require('./paths');
const pjson = require(path.join(__dirname, '..', 'package.json'));

const generalConfig = (opts = {}) => {
  return merge(
    parts.genericConfig(),
    parts.genericPlugins(),
    parts.manifestPlugin({
      fileName: 'client-manifest.json',
    }),
    parts.lintJavaScript({ include: paths.src }),
    parts.transpileJavaScript(),
    parts.loadImages(),
    parts.loadFonts({
      options: {
        name: '[name].[ext]',
      },
    }),
  );
};

const devConfig = merge(
  parts.devServer(),
  {
    plugins: [
      // new DashboardPlugin({ handler: dashboard.setData }),
      new (require('write-file-webpack-plugin')), // Writes files to disk instead of memory
      new webpack.HotModuleReplacementPlugin(),
      // new (require('offline-plugin')(require('./offlineOpts'))),
    ],
  },
  parts.loadCSS(),
  // parts.extractCSS({
    // include: (fn) => fn.includes('editor.js'), // Extract editor styles everytime because we can't include JS inside it.
  // }),

  parts.sourceMaps({ type: 'cheap-module-source-map' }),
);


const prodConfig = merge(
  {
    output: {
      filename: '[name].[chunkhash].js',
      publicPath: pjson.wptheme.publicPath.replace('http://localhost:8080', ''),
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      // new (require('offline-plugin')(require('./offlineOpts'))),
    ],
  },

  parts.extractCSS({
    filename: '[name].[contenthash].css',
  }),

  // no sourcemaps in prod, reason should be obvious.
  // parts.sourceMaps({ type: 'cheap-module-source-map' }),
);

const entries = {
  entry: {
    polyfill: ['babel-polyfill'],
    client: ['react-hot-loader/patch', path.join(paths.src, 'client.js')], // CSS & JS for the client
  },
};

module.exports = (env) => {
  return env === 'production'
    ? merge(entries, generalConfig(), prodConfig)
    : merge(entries, generalConfig(), devConfig);
};
