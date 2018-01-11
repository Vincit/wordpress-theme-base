const path = require('path');
const pjson = require(path.join(__dirname, '..', 'package.json'));
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const NyanProgressPlugin = require('nyan-progress-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const Imagemin = require('imagemin-webpack-plugin').default;
const ManifestPlugin = require('webpack-manifest-plugin');

const postcssLoader = require('./postcss.loader');
const stylusLoader = require('./stylus.loader');

const isWin = /^win/.test(process.platform);
const isMac = /^darwin/.test(process.platform);
const isHTTPS = pjson.wptheme.proxyURL.includes('https');

const paths = require('./paths');

exports.genericConfig = () => ({
  output: {
    path: paths.dist,
    filename: '[name].js',
    publicPath: pjson.wptheme.publicPath,
  },

  target: 'web',
  node: {
    fs: 'empty', // Don't ask why.
  },
});

exports.genericPlugins = () => ({
  plugins: [
    new webpack.NamedModulesPlugin(),
    new CaseSensitivePathsPlugin(), // for filesystems that aren't case sensitive (looking at you macOS and Windows...)
    new NpmInstallPlugin(), // Because no one wants to do it manually
    new FriendlyErrorsPlugin(), // Disable if you want webpack to be mean
    // new NyanProgressPlugin(), // Best progress bar.
    new webpack.LoaderOptionsPlugin({ // Look at the name.
      options: {
        eslint: {
          failOnWarning: false,
          failOnError: true,
        },
      },
    }),
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
});

exports.manifestPlugin = (opts) => ({
  plugins: [
    new ManifestPlugin(opts),
  ],
});

exports.devServer = ({ host, port } = {}) => {
  const options = {
    host: host || process.env.HOST || 'localhost', // Defaults to `localhost`
    port: port || process.env.PORT || 8080, // Defaults to 8080
  };
  options.publicPath = (isHTTPS ? 'https' : 'http') + '://' + options.host + ':' + options.port + pjson.wptheme.publicPath;

  return {
    devServer: {
      watchOptions: {
        poll: isWin || isMac ? undefined : 1000,
        aggregateTimeout: 300,
      },

      https: isHTTPS,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      host: options.host,
      port: options.port,

      overlay: {
        errors: true,
        warnings: false,
      },

      open: true,

      hotOnly: true, // Stop throwing our state to the garbage bin if hot load fails

      proxy: {
        '/': {
          target: pjson.wptheme.proxyURL,
          secure: false,
          changeOrigin: true,
          autoRewrite: true,
          headers: {
            'X-ProxiedBy-Webpack': true,
          },
        },
      },
      publicPath: options.publicPath,
    },
  };
};

exports.transpileJavaScript = () => ({
  module: {
    rules: [
      /* {
        test: /\.redom\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              'env',
              'stage-2',
            ],
            plugins: [
              require('babel-plugin-transform-redom-jsx'),
              [require('babel-plugin-transform-react-jsx'), {
                pragma: 'el',
              }],
              require('babel-plugin-transform-object-rest-spread'),
            ],
          }
        },
      }, */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [
              ['env', { modules: false }],
              'react',
              'stage-2',
            ],
            plugins: [
              require('babel-plugin-transform-react-jsx'),
              require('babel-plugin-transform-object-rest-spread'),
              require('react-hot-loader/babel'),
            ],
          }
        },
      },
    ],
  },
});

exports.lintJavaScript = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        include,
        exclude,

        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
    ],
  },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  // https://survivejs.com/webpack/styling/loading/#understanding-lookups
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: [
          'style-loader',
          'css-loader',
          postcssLoader,
        ],
      },
      {
        test: /\.styl$/,
        include,
        exclude,
        use: [
          'style-loader',
          'css-loader',
          postcssLoader,
          stylusLoader,
        ],
      },
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {

      },
    }),
  ],
});

exports.extractCSS = ({ filename, include, exclude }) => {
  // Output extracted CSS to a file
  const plugin = new ExtractTextPlugin({
    filename: filename || '[name].[contenthash].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.(css|styl)$/,
          include,
          exclude,
          use: plugin.extract({
            use: [
              'css-loader',
              postcssLoader,
              stylusLoader,
            ],
          }),
        },
      ],
    },
    plugins: [ plugin ],
  };
};


exports.sourceMaps = ({ type }) => ({
  devtool: type,
});

exports.loadImages = () => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        exclude: [/no-inline/],
        loader: 'svg-inline-loader',
      },
      {
        test: /\.svg$/,
        include: [/no-inline/],
        loader: 'url-loader',
      },
      {
        test: /\.(jpg|png|gif|JPG|PNG|GIF)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
        },
      },
    ],
  },
});

exports.loadFonts = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        include,
        exclude,

        use: {
          loader: 'file-loader',
          options,
        },
      },
    ],
  },
});

exports.configureResolver = () => ({
  resolve: {
    modules: [
      path.resolve(paths.src, 'js/'),
      path.resolve(path.join(paths.src, '../node_modules')),
    ],
    // alias: {
      // lib: path.resolve(paths.src, 'js/lib'),
    // },
  },
});
