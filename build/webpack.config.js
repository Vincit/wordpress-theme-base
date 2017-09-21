const path = require('path');
const pjson = require(path.join(__dirname, '..', 'package.json'));
const webpack = require('webpack');
const merge = require('webpack-merge');

// const HtmlPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
// const Dashboard = require('webpack-dashboard');
// const DashboardPlugin = require('webpack-dashboard/plugin'); // The dashboard looks nice, and is useful, but it's broken currently.
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Imagemin = require('imagemin-webpack-plugin').default;
const OfflinePlugin = require('offline-plugin');

const parts = require('./webpack.parts');
// const dashboard = new Dashboard();

const paths = {
  src: path.join(__dirname, '..', 'src'),
  dist: path.join(__dirname, '..', 'dist'),
};

const offlineOpts = {
  externals: [
    '/',
  ],
};

// Config used in all modes
const generalConfig = merge([
  {
    entry:  {
      client: ['babel-polyfill', path.join(paths.src, 'client.js')], // CSS & JS for the client
      editor: path.join(paths.src, 'editor'), // CSS & JS for the TinyMCE editor
      admin: path.join(paths.src, 'admin'), // CSS & JS for wp-admin
    },

    output: {
      path: paths.dist,
      filename: '[name].[hash].js',
      publicPath: pjson.wptheme.publicPath,
    },

    target: 'web',
    node: {
      fs: 'empty', // Don't ask why.
    },

    plugins: [
      new webpack.NamedModulesPlugin(),
      new CaseSensitivePathsPlugin(), // for filesystems that aren't case sensitive (looking at you macOS and Windows...)
      new NpmInstallPlugin(), // Because no one wants to do it manually
      new FriendlyErrorsPlugin(), // Disable if you want webpack to be mean
      new NyanProgressPlugin(), // Best progress bar.
      new webpack.LoaderOptionsPlugin({ // Look at the name.
        options: {
          eslint: {
            failOnWarning: false,
            failOnError: true,
            fix: false, // TODO: Make configurable w/ user pref
          },
        },
      }),
      new WriteFilePlugin(), // Writes files to disk instead of memory
      new CopyPlugin([
        {
          from: 'src/img',
          to: 'img',
          transform: (content) => {
            return content;
          },
        },
        {
          from: 'src/img/**/*',
          to: 'img/',
        },
      ]),
      new Imagemin(),
    ],
  },

  parts.lintJavaScript({ include: paths.src }),
  parts.transpileJavaScript(),
  parts.loadImages(),
  parts.loadFonts({
    options: {
      name: '[name].[ext]',
    },
  }),
]);

// Config used in development only
const devConfig = merge([
  parts.devServer(),
  {
    plugins: [
      // new DashboardPlugin({ handler: dashboard.setData }),
      new webpack.HotModuleReplacementPlugin(),
      new OfflinePlugin(offlineOpts),
    ],
  },
  parts.loadCSS(),
  parts.sourceMaps({ type: 'cheap-module-source-map' }),
]);

// Config used for production builds
const prodConfig = merge([
  {
    plugins: [
      new webpack.optimize.UglifyJsPlugin(),
      new OfflinePlugin(offlineOpts), // twice because README said it's best to be the last
    ],
  },

  parts.extractCSS({
    filename: '[name].[hash].css',
    use: ['css-loader', parts.autoprefix(), 'stylus-loader'],
  }),

  parts.sourceMaps({ type: 'cheap-module-source-map' }),
]);

module.exports = (env) => {
  return env === 'production'
    ? merge(generalConfig, prodConfig)
    : merge(generalConfig, devConfig);
};
