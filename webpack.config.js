const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const fs = require("fs");

const filenames = fs.readdirSync(path.resolve(__dirname, "src/i18n"));
const supportedLanguages = filenames.map((filename) =>
  filename.replace(".js", "")
);

const htmlPlugins = supportedLanguages.map(
  (lang) =>
    new HtmlWebpackPlugin({
      template: "./src/index.ejs",
      filename: `${lang}.html`,
      data: require(`./src/i18n/${lang}.js`),
      // 添加预加载指令
      scriptLoading: "defer",
      preload: ["*.js"],
      prefetch: ["i18n-*.js"],
    })
);

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    // 为代码分割的文件指定名称格式
    chunkFilename: "[name].[contenthash].js",
  },
  // 优化配置
  optimization: {
    // 启用代码分割
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        // i18n文件单独打包
        i18n: {
          test: /[\\/]i18n[\\/]/,
          name(module) {
            // 获取语言文件名作为chunk名
            const match = module.context.match(/[\\/]i18n[\\/](.*?)\.js$/);
            return match ? `i18n-${match[1]}` : "i18n";
          },
          priority: 20,
          minSize: 0,
        },
      },
    },
  },
  // 开发服务器配置
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 8080,
    hot: true,
    open: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
    ],
  },
  plugins: [
    // 抽取CSS为独立文件以利用缓存
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
    // 第一个HTML页面
    new HtmlWebpackPlugin({
      template: "./src/index.ejs",
      filename: `index.html`,
      data: require(`./src/i18n/en.js`),
      // 添加预加载指令
      scriptLoading: "defer",
      preload: ["*.js"],
      prefetch: ["i18n-*.js"],
    }),
    ...htmlPlugins,
  ],
};
