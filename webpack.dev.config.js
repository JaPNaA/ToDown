const path = require("path");

const prodConfig = require("./webpack.config");

const devConfig = {
    ...prodConfig,
    mode: "development",
    watch: true
}

const distConfig = Object.assign({}, devConfig);

const testConfig = Object.assign({}, devConfig, {
    name: "test",
    entry: "./test/index.ts",
    target: "node",
    module: {
        rules: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
                loader: "ts-loader",
                options: {
                    configFile: "tsconfig.test.json"
                }
            }
        }]
    },
    output: {
        path: path.resolve(__dirname, "distTest"),
        filename: "bundle.js",
        publicPath: "./"
    },
    plugins: []
});

module.exports = [distConfig, testConfig];
