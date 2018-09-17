const path = require('path');

const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const compressionWebpackPlugin = require('compression-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = require('./webpack.base.conf');
const util = require('./util');
const config = require('../config');
const generatePages = util.generateMultiHtml(true);

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const ENV = process.env.NODE_ENV;

const buildConfig = {
    mode: ENV,
    optimization: {
        mangleWasmImports: true,
        removeAvailableModules: true,
        removeEmptyChunks: true,
        mergeDuplicateChunks: true,
        minimizer: [ //指定压缩器
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: false
            }),
            new OptimizeCSSAssetsPlugin()
        ],
        runtimeChunk: {
            name: "manifest"
        },
		splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0,
            minChunks: 1,
            automaticNameDelimiter: '~',
            name: true,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					chunks: 'initial',
					name: 'vendor',
					priority: -10,
					enforce: true
                }
			}
		}
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            },
                            optipng: {
                                enabled: false,
                            },
                            pngquant: {
                                quality: '65-80',
                                speed: 4
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            webp: {
                                quality: 75
                            }
                        }
                    }
                ]
            }
        ]
    },
 
    plugins: [
        new cleanWebpackPlugin(['dist'], {
            root: resolve(''),
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new compressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(js|css)$'),
            threshold: 40240,
            minRatio: 0.6
        })
    ]
}

module.exports = merge(buildConfig, merge([baseConfig].concat(generatePages)))