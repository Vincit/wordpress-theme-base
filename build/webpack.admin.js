const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const paths = require('./paths');
const parts = require('./webpack.parts');
const pjson = require(path.join(__dirname, '..', 'package.json'));

const OfflinePlugin = require('offline-plugin');
const offlineOpts = require('./offlineOpts');

const entries = {
  entry: {
    editor: path.join(paths.src, 'editor'), // CSS & JS for the TinyMCE editor
    admin: path.join(paths.src, 'admin'), // CSS & JS for wp-admin
  },
};

const generalConfig = merge(
  parts.configureResolver(),
  parts.genericConfig(),
  parts.genericPlugins(),

  parts.lintJavaScript({ include: paths.src }),
  parts.transpileJavaScript(),

  parts.loadImages(),

  parts.extractCSS({
    filename: '[name].[contenthash].css',
  }),

  parts.manifestPlugin({
    fileName: 'admin-manifest.json',
  })
);

const prodConfig = merge(
  {
    output: {
      filename: '[name].[chunkhash].js',
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new OfflinePlugin(offlineOpts),
    ],
  },
  parts.loadFonts({
    options: {
      name: '[name].[chunkhash].[ext]',
    },
  })
);

const devConfig = merge(
  parts.loadFonts({
    options: {
      name: '[name].[ext]',
    },
  }),

  parts.sourceMaps({ type: 'cheap-module-source-map' })
);

module.exports = (env) => {
  return env === 'production'
    ? merge(entries, generalConfig, prodConfig)
    : merge(entries, generalConfig, devConfig);
};
