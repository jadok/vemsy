var path = require('path');
module.exports = {
  entry: './core/index.ts',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  target: 'node',
  module: {
    rules: [
      {
        use: 'ts-loader',
        test: /\.ts?$/
      }
    ]
  }
}
