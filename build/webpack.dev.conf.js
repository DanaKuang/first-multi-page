const webpack = require('webpack');
const merge = require('webpack-merge');

const path = require('path');

const baseConfig = require('./webpack.base.conf');
const config = require('../config');
const util = require('./util');
const generatePages = util.generateMultiHtml();

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const ENV = process.env.NODE_ENV;

const devConfig = {
    mode: ENV,
    devServer: {
        host: config.dev.host,
        port: config.dev.port,
        hot: true,
        open: true,
        publicPath: config.dev.serverPublicPath,
        // headers: //Adds headers to all responses
        proxy: [config.dev.proxy],
        historyApiFallback: true,
        clientLogLevel: 'warning',
        overlay: config.dev.overlay ? {
            warnings: false, 
            errors: true
        } : false
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

// 采用多页面单配置
module.exports = merge(devConfig, merge([baseConfig].concat(generatePages)))
