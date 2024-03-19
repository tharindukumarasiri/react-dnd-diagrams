var path = require("path");

module.exports = {
    mode: "production",
    entry: "./src/index.jsx",
    output: {
        path: path.resolve("build"),
        filename: "index.js",
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                    },
                ],
            },
        ],
    },
    externals: {
        react: "react"
    }
};