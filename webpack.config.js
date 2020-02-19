const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const appPath = path.resolve(__dirname, './app');
const distPath = path.resolve(__dirname, './dist');
const htmlPath = path.resolve(appPath, './html/');
const jsPath = path.resolve(appPath, './js/');
const scssPath = path.resolve(appPath, './scss/');

module.exports = {
  entry: [path.resolve(jsPath, './main.js'), path.resolve(scssPath, './styles.scss')],
  output: {
    path: distPath,
    filename: 'js/[name].js',
    publicPath: './'
  },
  module: {
    rules: [
      {
        test: /.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff|woff2|svg|jpg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              regExp: /(fonts|icons|images)/,
              name: '[1]/[name].[ext]',
              outputPath: 'assets',
              esModule: false
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpgeg: {
                progressive: true,
                quality: 65
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCSSAssetsPlugin(),
    new MiniCssExtractPlugin({ filename: 'css/[name].css' }),
    new HtmlWebpackPlugin({ template: path.resolve(htmlPath, './index.html'), filename: 'index.html' }),
    new HtmlWebpackPlugin({ template: path.resolve(htmlPath, './contactus.html'), filename: 'contactus.html' }),
    new HtmlWebpackPlugin({ template: path.resolve(htmlPath, './tours.html'), filename: 'tours.html' }),
    new HtmlWebpackPlugin({ template: path.resolve(htmlPath, './aboutus.html'), filename: 'aboutus.html' })
  ],
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  },
  devServer: {
    contentBase: distPath,
    open: true,
    publicPath: '/',
    writeToDisk: true
  }
};
