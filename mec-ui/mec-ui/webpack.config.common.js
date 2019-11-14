const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve("src", "index.jsx"),

    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js"
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, "src"),
                loader: "babel-loader",
                options: {
                    "presets": [
                        "@babel/preset-env",
                        "@babel/preset-react",
                    ],
                    "plugins": [
                        "@babel/plugin-transform-runtime"
                    ]
                }
            }
        ]
    },

    resolve: {
        extensions: ["*", ".js", ".jsx"]
    },

    target: "web",

    plugins: [
        new HtmlWebpackPlugin({
            title: "Nokia ETSI MEC Hackathon Challenge",
            template: "!!blueimp-tmpl-loader!src/index.template.html"
        }),
        new webpack.EnvironmentPlugin(["NODE_ENV"])
    ],
};
