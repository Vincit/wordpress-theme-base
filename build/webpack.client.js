const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const parts = require('./webpack.parts');
const paths = require('./paths');
const pjson = require(path.join(__dirname, '..', 'package.json'));

const OfflinePlugin = require('offline-plugin');
const offlineOpts = require('./offlineOpts');

const generalConfig = merge(
  parts.configureResolver(),
  parts.genericConfig(),
  parts.genericPlugins(),

  parts.lintJavaScript({ include: paths.src }),
  parts.transpileJavaScript(),

  parts.loadImages(),

  parts.manifestPlugin({
    fileName: 'client-manifest.json',
  })
);

const devConfig = merge(
  parts.devServer(),
  {
    plugins: [
      // new DashboardPlugin({ handler: dashboard.setData }),
      new (require('write-file-webpack-plugin')), // Writes files to disk instead of memory
      new webpack.HotModuleReplacementPlugin(),
    ],
  },

  parts.loadFonts({
    options: {
      name: '[name].[ext]',
    },
  }),

  parts.loadCSS(),
  parts.sourceMaps({ type: 'cheap-module-source-map' })
);


const prodConfig = merge(
  {
    output: {
      filename: '[name].[chunkhash].js',
      publicPath: pjson.wptheme.publicPath.replace('http://localhost:8080', ''),
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
  }),

  parts.extractCSS({
    filename: '[name].[contenthash].css',
  })

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
    ? merge(entries, generalConfig, prodConfig)
    : merge(entries, generalConfig, devConfig);
};
