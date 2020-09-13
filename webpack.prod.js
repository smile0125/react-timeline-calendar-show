const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    mode: 'production',
    entry: {
        bundle: path.join(__dirname, './src/index.jsx'),
        vendor: ['react', 'react-dom','react-router-dom', 'redux']
    },
    output: {
        path: path.join(__dirname, './build'),
        filename: 'js/[name]-[hash].js'
    },

    module: {
        rules: [{
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader //将css文件单独打包出来
                    },
                    {
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
                                require('autoprefixer')({overrideBrowserslist: ['> 0.15% in CN']}),
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
        // new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, './public/index.html'),
            minify: { //对当前生成的文件进行压缩
                removeComments: true, //删除注释
                collapseWhitespace: true //删除空格
            }
        }),
        new MiniCssExtractPlugin({ //单独打包css
            filename: 'css/[name]-[hash].css',
            chunkFilename: 'css/[id]-[hash].css',
        }),
    ],

    optimization: { // 一般在生产环境中用到
        minimizer: [
            new OptimizeCssAssetsPlugin({}), //压缩css
            new UglifyJsPlugin({ //压缩js
                cache: true,
                parallel: true,
                sourceMap: true
            })
        ],
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            // automaticNameMaxLength: 30,
            name: true,
            cacheGroups: {
                vendors: {
                    test: /(react|react-dom|react-router-dom|redux)/,
                    priority: -10,
                    chunks: 'all',
                    name: 'vendor'
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    }
};