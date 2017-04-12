import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import autoprefixer from 'autoprefixer';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import path from 'path';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production'),
  __DEV__: false
};

export default {
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  debug: true,
  devtool: 'source-map',
  noInfo: true, // set to false to see a list of every file being bundled.
  entry: path.resolve(__dirname, 'app/src/main'),
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'node/public'),
    publicPath: '/',
    filename: 'src/[name].[chunkhash].js'
  },
  plugins: [

    new CleanWebpackPlugin(['node/public'], {
      root: __dirname,
      verbose: true,
      dry: false,
      exclude: ['shared.js']
    }),

    // copy static resources
    new CopyWebpackPlugin([{
      from: 'app/images',
      to: 'images'
    }], {
      copyUnmodified: true
    }),

    // Hash the files using MD5 so that their names change when the content changes.
    new WebpackMd5Hash(),

    // Optimize the order that items are bundled. This assures the hash is deterministic.
    new webpack.optimize.OccurenceOrderPlugin(),

    // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
    new webpack.DefinePlugin(GLOBALS),

    // Generate an external css file with a hash in the filename
    new ExtractTextPlugin('styles/[name].[contenthash].css'),

    // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        //collapseWhitespace: true, //uncomment this line to allow html compression
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),

    // Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),

    // Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],

  /**
   * Module loaders
   */
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel'},
      {test: /\.eot(\?v=\d+.\d+.\d+)?$/, loader: 'url?name=fonts/[name].[ext]'},
      {test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'},
      {test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream&name=fonts/[name].[ext]'},
      {test: /\.svg(\?v=\d+.\d+.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml&name=[name].[ext]'},
      {test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file?name=images/[name].[ext]'},
      {test: /\.ico$/, loader: 'file?name=images/[name].[ext]'},
      {test: /(\.css|\.scss)$/, loader: ExtractTextPlugin.extract('css?sourceMap!postcss!sass?sourceMap')},
      {test: /\.json$/, loader: "json"}
    ]
  },

  /**
   * Post css loader configs
   */
  postcss: () => [autoprefixer]
};



//
