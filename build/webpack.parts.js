const path = require('path');
const pjson = require(path.join(__dirname, '..', 'package.json'));
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = ({ host, port } = {}) => ({
  devServer: {
    // Enable history API fallback so HTML5 History API based
    // routing works. Good for complex setups.
    // historyApiFallback: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    host: host || process.env.HOST, // Defaults to `localhost`
    port: port || process.env.PORT, // Defaults to 8080

    overlay: {
      errors: true,
      warnings: true,
    },
    proxy: {
      '/': {
        target: 'https://wordpress.local',
        secure: false,
      },
    },
    publicPath: pjson.wptheme.publicPath,
  },
});

exports.transpileJavaScript = () => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
          },
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
        loader: 'svg-inline-loader',
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
