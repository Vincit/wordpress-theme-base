const path = require('path');
const pjson = require(path.join(__dirname, '..', 'package.json'));
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isWin = /^win/.test(process.platform);
const isMac = /^darwin/.test(process.platform);
const isHTTPS = pjson.wptheme.proxyURL.includes('https');

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

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
  },
};

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
          {
            loader: 'stylus-loader',
            options: {
              import: [
                '~jeet/styl/index.styl'
              ],
              preferPathResolver: 'webpack',
            }
          }
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
    filename: filename || '[name].[hash].css',
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
              'stylus-loader',
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
