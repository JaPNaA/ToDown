const path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/main.ts",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/assets/"
    },
    module: {
        rules: []
    },
    target: "web",
    plugins: []
};