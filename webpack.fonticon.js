const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globals = require("./src/globals.json");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let prefix = process.env.prefix || "prod";

module.exports = {
  entry: {
    icons: "./src/index-fonticon.js",
  },
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist-fonticon"),
  },
  module: {
    rules: [
      {
        test: /\.font\.js/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          {
            loader: "webfonts-loader",
            options: {
              publicPath: globals.customerThemeModule,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["*.js"],
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: false,
      protectWebpackAssets: false,
    }),
    new MiniCssExtractPlugin({
      filename: `${globals.customer.name}.fonticon.css`,
    }),
  ],
};
