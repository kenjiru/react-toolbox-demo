var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

var src_dir = path.join(__dirname, "/src");
const nodeEnv = process.env.NODE_ENV || "development";

var config = {
    context: __dirname,
    entry: {
        app: src_dir + "/App.tsx"
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "App.js?[hash]"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".scss", ".css"],
        modules: [
            path.resolve("./src"),
            "node_modules"
        ]
    },
    module: {
        loaders: [
            {
                test: /\.(tsx|ts)$/,
                loader: "ts-loader",
                include: src_dir
            }, {
                test: /\.less$/,
                loaders: ["style-loader", "css-loader", "less-loader"]
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: [
                        "css?sourceMap&modules&importLoaders=1",
                        "sass"
                    ]
                })
            }, {
                test: /\.css/,
                loaders: ["style-loader", "css-loader"]
            }, {
                test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg)$/,
                exclude: /public/,
                loader: "url-loader",
                query: {
                    limit: 500,
                    name: "[path][name].[ext]",
                    hash: "[hash]"
                }
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false,
            sassLoader: {
                data: '@import "theme.config.scss";',
                includePaths: [src_dir]
            }
        }),
        new HtmlWebpackPlugin({
            title: "React TypeScript demo"
        }),
        new ExtractTextPlugin("[name].css?[hash]"),
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        new webpack.DefinePlugin({
            "process.env": { NODE_ENV: JSON.stringify(nodeEnv) }
        })
    ],
    devServer: {
        contentBase: "./src",
        hot: true
    }
};

module.exports = config;