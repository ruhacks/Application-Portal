const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = () => {
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
        },
    };
};
