const path = require("path")
const webpack = require('webpack')

// 路径别名配置
const alias = {
  '@components': path.resolve(__dirname, '../components')
};

module.exports = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "babel-loader",
          }, {
            loader: "eslint-loader",
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: { javascriptEnabled: true, sourceMap: false }
          }
        ],
      },
      {
        // for font
        test: /\.(ttf|otf|eot|woff(?:2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1000,
            },
          },
        ],
      },
      {
        // for svg
        test: /\.(svg?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1000,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|ogg|mp3)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1000,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias,
    extensions: [".js", ".jsx", ".js", ".json"],
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn|en-gb/),
  ]
}
