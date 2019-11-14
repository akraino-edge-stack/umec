const path = require("path");

module.exports = {
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: require.resolve('ts-loader'),
                include: path.resolve(__dirname, '../'),
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
        modules: [
            path.resolve("./src"),
            path.resolve("./node_modules"),
        ],
    }
};
