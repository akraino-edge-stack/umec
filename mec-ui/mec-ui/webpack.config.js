const merge = require("webpack-merge");

const common = require("./webpack.config.common.js");
const development = require("./webpack.config.development.js");
const production = require("./webpack.config.production.js");

module.exports = function(env) {
    let config = common;

    switch (env) {
        case "development":
            return merge(development, config);

        case "production":
            return merge(production, config);

        default:
            throw new Error("Webpack env not specified!");
    }
};
