module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.graphql$/,
          exclude: /node_modules/,
          use: ["graphql-persisted-document-loader", "graphql-tag/loader"],
        },
      ],
    },
  },
  devServer: {
    proxy: {
      "/graphql": {
        target: "http://localhost:8082",
      },
    },
  },
}
