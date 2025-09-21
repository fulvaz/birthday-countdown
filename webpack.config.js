const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    // 为代码分割的文件指定名称格式
    chunkFilename: '[name].[contenthash].js',
  },
  // 优化配置
  optimization: {
    // 启用代码分割
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // i18n文件单独打包
        i18n: {
          test: /[\\/]i18n[\\/]/,
          name(module) {
            // 获取语言文件名作为chunk名
            const match = module.context.match(/[\\/]i18n[\\/](.*?)\.js$/);
            return match ? `i18n-${match[1]}` : 'i18n';
          },
          priority: 20,
          minSize: 0
        }
      }
    }
  },
  // 开发服务器配置
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 8080,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  plugins: [
    // 第一个HTML页面
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html',
      data: {
        hi: '这是第一个页面的内容'
      },
      // 添加预加载指令
      scriptLoading: 'defer',
      preload: ['*.js'],
      prefetch: ['i18n-*.js']
    }),
    // 第二个HTML页面
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'page2.html',
      data: {
        hi: '这是第二个页面的内容'
      },
      // 添加预加载指令
      scriptLoading: 'defer',
      preload: ['*.js'],
      prefetch: ['i18n-*.js']
    })
  ]
};