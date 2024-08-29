const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const globals = require("./src/globals.json");
const package = require("./package.json");
const path = require("path");
const glob = require("glob");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

let prefix = process.env.prefix || "prod";

module.exports = {
  entry: glob.sync("./src/entries/index-*.js").reduce((acc, path) => {
    const entry = path.replace("./src/entries/index-", "").replace(".js", "");
    acc[entry] = path;
    return acc;
  }, {}),
  mode: prefix === "dev" ? "development" : "production",
  devtool: prefix === "dev" ? "inline-source-map" : "hidden-source-map",
  output: {
    clean: true,
    filename: `${prefix}.${globals.customer.name}.[name].js`,
    path: path.resolve(__dirname, "dist-server"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  {
                    "postcss-preset-env": {
                      browsers: "last 2 versions",
                      stage: 4,
                    },
                  },
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                minimize: false,
                outputStyle: "expanded",
              },
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: `${globals.customer.themeModule}/fonts/[name][ext]`,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ["*.txt", "*.map", "*.js"],
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: false,
      protectWebpackAssets: false,
    }),
    new MiniCssExtractPlugin({
      filename: `${prefix}.${globals.customer.name}.[name].css`,
    }),

    new webpack.BannerPlugin({
      banner: () => {
        return `[base] || Version: ${package.version} || ${new Date()}`;
      },
    }),
  ],
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
    hot: false,
    static: {
      directory: path.join(__dirname, "dist-server"),
    },
    port: 3000,
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              normalizeWhitespace: false,
            },
          ],
        },
      }),
    ],
  },
};
