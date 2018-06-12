var path = require('path');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './core/index.ts',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.scss', '.ts', '.js', '.json']
  },
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
          }
        ]
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'], exclude: /node_modules/ }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
}
