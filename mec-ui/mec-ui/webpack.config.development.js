const webpack = require("webpack");

module.exports = {
    mode: "development",

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],

    devtool: "eval-source-map",

    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        proxy: {
            "/mp1/*": {
                target: "http://localhost:8080/",
                secure: false
            }
        },

        // display only errors to reduce the amount of output
        stats: "errors-only",

        // parse host and port from env so this is easy
        // to customize
        host: process.env.HOST,
        port: process.env.PORT
    },
};
