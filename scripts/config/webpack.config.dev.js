const resolveApp = require('./common');
const path = require('path');
const webpack = require('webpack');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const config = {
    devtool: 'cheap-module-source-map',
    mode: 'development',
    entry: {
        "index": resolveApp("src/index.js")
    },
    output: {
        path: resolveApp('dist'),
        filename: '[name].js'
    },
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: './react',
                commonjs: ['./react'],
                amd: 'react',
            },
        },
        {
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: './react-dom',
                commonjs: ['./react-dom'],
                amd: 'react-dom',
            },
        },
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: [
                    /src/
                ],
                exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["react-app"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|svg|ttf|eot)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
        // new webpack.DllReferencePlugin({
        //     manifest: path.join(resolveApp('www/js/dll'), 'vendor-manifest.json') // 指定manifest.json，也就是上面生成的。
        // })
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
    }
};

module.exports = config;