const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
module.exports = {
  mode: "development",
  devtool:'source-map',
  entry: './src/index.tsx',
  output: {
    filename: "js/out.js",
    path:  path.join(__dirname,'build')
  },
  devServer:{
    port: 1333,
    hot: true,
    open: true
  },
  resolve: {
    extensions: [".js", ".json", '.ts', '.jsx','.tsx'],
    alias: {
      '@': path.resolve('./src') // 路径别名
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use:'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: ['style-loader','css-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'demo',
      meta: {
        viewport: 'width=device-width'
      },
      template: './public/index.html'
    }),
    new ForkTsCheckerWebpackPlugin()
  ]
}