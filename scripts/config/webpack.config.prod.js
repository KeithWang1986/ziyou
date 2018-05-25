const resolveApp = require('./common');
const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const shouldUseSourceMap = false;
//const shouldUseSourceMap = "eval-source-map";

const config = {
    // Don't attempt to continue if there are any errors.
    bail: true,
    devtool: shouldUseSourceMap,
    mode: 'production',
    entry: {
        "ziyou": resolveApp("src/index.js")
    },
    output: {
        filename: '[name].min.js',
        path: resolveApp('dist'),
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: [
        {
            react: {
                root: 'React',
                commonjs2: '../../app/node_modules/react',
                commonjs: ['../../app/node_modules/react'],
                amd: 'react'
            },
        },
        {
            'react-dom': {
                root: 'ReactDOM',
                commonjs2: '../../app/node_modules/react-dom',
                commonjs: ['../../app/node_modules/react-dom'],
                amd: 'react-dom'
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new MiniCssExtractPlugin({
            filename: "[name].min.css",
            chunkFilename: "[id].min.css"
        })
        // Minify the code.        
    ],
    optimization: {
        minimize: true
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