const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const dotenv = require("dotenv");
const webpack = require("webpack");

module.exports = () => {
    // call dotenv and it will return an Object with a parsed key
    const env = dotenv.config().parsed;

    const envKeys = Object.keys(env).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(env[next]);
        return prev;
    }, {});

    return {
        //entry: "./src/index.js",
        entry: {
            js: ["babel-polyfill", "./src/index.js"],
            vendor: ["react"],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                        },
                    ],
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        // Creates `style` nodes from JS strings
                        "style-loader",
                        // Translates CSS into CommonJS
                        "css-loader",
                        // Compiles Sass to CSS
                        "sass-loader",
                    ],
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.(png|jpg|gif|svg)$/i,
                    use: [
                        {
                            loader: "url-loader",
                            options: {
                                limit: 8192,
                            },
                        },
                    ],
                },
            ],
        },
        node: {
            fs: "empty",
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: `./src/index.html`,
                filename: `./index.html`,
            }),
            new CopyWebpackPlugin({
                patterns: [
                    // relative path is from src
                    { from: "./src/media/favicon.ico" }, // <- your path to favicon
                ],
            }),
            new webpack.DefinePlugin(envKeys),
        ],
        resolve: {
            extensions: ["*", ".js", ".jsx"],
        },
        output: {
            path: __dirname + "/dist",
            publicPath: "/",
            filename: "[name].js",
        },
        devServer: {
            contentBase: "./dist",
            historyApiFallback: {
                index: "index.html",
            },
            port: "8080",            // in ASF is METADATA.port,
            host: "0.0.0.0",         // in ASF is METADATA.host,     
            public: "0.0.0.0:8080",  // in ASF is METADATA.public,
            disableHostCheck: true,
        },
    };
};
