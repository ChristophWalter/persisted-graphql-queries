module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.graphql$/,
          exclude: /node_modules/,
          use: ["graphql-tag/loader"],
        },
      ],
    },
  },
}
