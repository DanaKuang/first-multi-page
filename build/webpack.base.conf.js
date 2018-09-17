const webpack = require('webpack');
const {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const util = require('./util');
const config = require('../config');
const entries = util.getMultiEntries(resolve('src/' + config.modulename + '/**/**/**/*.js'));

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const ENV = process.env.NODE_ENV;

module.exports = {
    entry: entries,
    output: {
        path: config.build.rootPath,
        filename: 'js/[name].js',
        publicPath: ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        chunkFilename: 'js/[name].chunk.js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.scss', '.css'],
        alias: {
            '@': resolve('src'),
            'components': resolve('src/components'),
            'views': resolve('src/views'),
            'assets': resolve('src/assets'),
            'api': resolve('src/api'),
            'lib': resolve('src/lib'),
            'static': resolve('static')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: resolve('src')
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    ENV === 'development' ? {
                        loader: 'vue-style-loader'
                    } : {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')({
                                    browsers: ['ios >= 7', 'Android >= 4.1']
                                }),
                                require('postcss-plugin-px2rem')({
                                    rootValue: 75,
                                    baseDpr: 2
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ],
                include: resolve('src')
            },
            {
                test: /\.(png|jpeg|gif|jpg)$/i,
                loader: 'file-loader',
                options: {
                    name: 'assets/[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.ProvidePlugin({
            axios: 'axios',
            qs: 'qs'
		})
    ]
}
