const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    name: "dist",
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "./"
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    target: "web",
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            title: "ToDown"
        })
    ],

    mode: "production",
    watch: false
};