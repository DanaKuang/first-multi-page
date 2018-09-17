const glob = require('glob');
const path = require('path');
const config = require('../config');

function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.getMultiEntries = function (globPath) {
    var entries = {},
    basename, tmp, pathname;
    glob.sync(globPath).forEach(entry => {
        basename = path.basename(entry, path.extname(entry));
        tmp = (entry.split('/')).splice(entry.split('/').indexOf('src') + 1);
        pathname = (tmp.splice(0, tmp.length-1)).join('/'); // 'views/activity/no1', 'views/platform/template001/yz'
        entries[pathname] = entry;
    })
    return entries; 
}

exports.generateMultiHtml = function (bool) {
    var pages = exports.getMultiEntries(resolve('src/' + config.modulename + '/**/**/**/*.html')),
        htmls = [];
    Object.keys(pages).forEach(n => {
        var conf = {
            template: pages[n],
            title: '我是' + n, 
            // filename: n + '.html', 考虑到层级不同，放到下面处理
            chunks:['manifest', 'vendor', n] 
        }
        if (n.includes('platform')) {
            var tmp = n.split('/');
            tmp.splice(1,1)
            n = tmp.join('/');
        } 

        conf.filename = n + '.html';
        if (bool) {
            conf.minify = {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true
            }
        }
        htmls.push(new HtmlWebpackPlugin(conf))
    })
    return {
        plugins: htmls
    }
}
