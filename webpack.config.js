module.exports = {
  entry: "./test/index.js",
  output: {
    filename: "bundle.js",
  },
  watch: true,
  devServer: {
    inline: true,
    port: 10000,
  },
};
