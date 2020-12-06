const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'production',
    entry: {
        bundle: path.join(__dirname, './src/index.jsx'),
    },
    output: {
        path: path.join(__dirname, './build'),
        filename: 'testPlugin.js',
        library: 'testPlugin', // 指定类库名,主要用于直接引用的方式(比如使用script 标签)
        libraryExport: "default", // 对外暴露default属性，就可以直接调用default里的属性
        globalObject: 'this', // 定义全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
        libraryTarget: 'umd' // 定义打包方式Universal Module Definition,同时支持在CommonJS、AMD和全局变量使用
    },

    module: {
        rules: [{
                test: /\.(css|scss)$/,
                use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            sourceMap: true,
                            plugins: [
                                require('autoprefixer')({
                                    overrideBrowserslist: ['> 0.15% in CN']
                                }),
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: path.join(__dirname, 'node_modules'),
                use: ['babel-loader'],
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/i,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 10000,
                        name: 'img/[name]-[hash].[ext]', //指定生成的图片名称 ext后缀名
                    },
                }]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './public/index.html'),
            minify: { //对当前生成的文件进行压缩
                removeComments: true, //删除注释
                collapseWhitespace: true //删除空格
            }
        }),
        new MiniCssExtractPlugin(),

    ],

    externals: {
        testPlugin: "testPlugin"
    }
};