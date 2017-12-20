const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const paths = require('./paths');
const parts = require('./webpack.parts');
const pjson = require(path.join(__dirname, '..', 'package.json'));

const entries = {
  entry: {
    editor: path.join(paths.src, 'editor'), // CSS & JS for the TinyMCE editor
    admin: path.join(paths.src, 'admin'), // CSS & JS for wp-admin
  },
};

const generalConfig = merge(
  parts.genericConfig(),
  parts.lintJavaScript({ include: paths.src }),
  parts.transpileJavaScript(),
  parts.genericPlugins(),
  parts.manifestPlugin({
    fileName: 'admin-manifest.json',
  }),
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
    filename: '[name].css', // put content hash here
  }),
);

const devConfig = merge(
  parts.loadCSS(),
  parts.sourceMaps({ type: 'cheap-module-source-map' }),
);

module.exports = (env) => {
  return env === 'production'
    ? merge(entries, generalConfig, prodConfig)
    : merge(entries, generalConfig, devConfig);
};
