const path = require('path');
const pjson = require(path.join(__dirname, '..', 'package.json'));
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isWin = /^win/.test(process.platform);
const isMac = /^darwin/.test(process.platform);

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    // Enable history API fallback so HTML5 History API based
    // routing works. Good for complex setups.
    // historyApiFallback: true,

    watchOptions: {
      poll: isWin || isMac ? undefined : 1000,
      aggregateTimeout: 300,
    },

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    host: host || process.env.HOST, // Defaults to `localhost`
    port: port || process.env.PORT, // Defaults to 8080

    overlay: {
      errors: true,
      warnings: true,
    },

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
    publicPath: pjson.wptheme.publicPath,
    // contentBase: pjson.wptheme.publicPath, // URLs are deprecated, and this is not necessary.
  },
});

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
              'env',
              'react',
              'stage-2',
            ],
            plugins: [
              require('babel-plugin-transform-react-jsx'),
              require('babel-plugin-transform-object-rest-spread'),
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
        ],
      },
      {
        test: /\.styl$/,
        include,
        exclude,
        use: [
          'style-loader',
          'css-loader',
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

exports.extractCSS = ({ filename, include, exclude, use }) => {
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
            use,
            // fallback: ['css-loader', 'stylus-loader'], // enable and the world will explode
          }),
        },
      ],
    },
    plugins: [ plugin ],
  };
};


exports.autoprefix = () => ({
  loader: 'postcss-loader',
  options: {
    plugins: () => ([
      require('autoprefixer'),
    ]),
    sourceMap: true,
  },
});

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
