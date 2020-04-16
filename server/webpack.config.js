const NodemonPlugin = require("nodemon-webpack-plugin")

module.exports = {
  target: "node",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.graphql$/,
        exclude: /node_modules/,
        use: ["graphql-persisted-document-loader", "graphql-tag/loader"],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  plugins: [new NodemonPlugin()],
}
