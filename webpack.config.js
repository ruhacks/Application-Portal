const HtmlWebpackPlugin = require("html-webpack-plugin");
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
        entry: "./src/index.js",
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
                template: "./src/index.html",
                filename: "./index.html",
            }),
            new webpack.DefinePlugin(envKeys),
        ],
        resolve: {
            extensions: ["*", ".js", ".jsx"],
        },
        output: {
            path: __dirname + "/dist",
            publicPath: "/",
            filename: "bundle.js",
        },
        devServer: {
            contentBase: "./dist",
            historyApiFallback: {
                index: "index.html",
            },
        },
    };
};
