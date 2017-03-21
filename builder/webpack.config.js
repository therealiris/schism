import webpack from 'webpack';
import path from 'path';
import autoprefixer from 'autoprefixer';

/**
 * Webpack configurations
 */
export default {

  debug: true,
  devtool: 'inline-source-map', //webpack dev tools
  noInfo: false,

  /**
   * Entry point settings
   */
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'app/src/main')
  ],

  target: 'web',

  /**
   * Output location configuration
   */
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },

  /**
   * Dev server configuration
   */
  devServer: {
    contentBase: path.resolve(__dirname, 'app')
  },

  /**
   * Dev plugins
   */
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],

  /**
   * Module loader configurations
   */
  module: {
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'app/src'), loaders: ['babel']},
      {test: /\.json$/, loaders: ['json-loader']},
      {test: /(\.css)$/, loaders: ['style', 'css']},
      {test: /\.scss$/, loaders: ["style-loader", "css-loader", "postcss", "sass-loader"]},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)(\?v=.+)?$/, loader: 'url?prefix=fonts/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.(jpe?g)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=image/jpeg'},
      {test: /\.(png)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=image/png'},
      {test: /\.(svg)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?mimetype=image/svg'}
      // {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'},
    ]
  },

  /**
   * PostCSS configurations
   */
  postcss: () => [autoprefixer]
};



//
