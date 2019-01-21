const prodConfig = require("./webpack.config");

module.exports = {
    ...prodConfig,
    mode: "development",
    watch: true
};