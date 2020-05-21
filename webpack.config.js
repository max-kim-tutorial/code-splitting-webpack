const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    // 하나의 페이지만 생성
    page1: "./src/index1.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  optimization: {
    // 코드 스플리팅 할거임
    splitChunks: {
      chunks: "all",
      name: "vendor",
    },
  },
  plugins: [new CleanWebpackPlugin()],
  mode: "production",
};
