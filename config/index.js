const path = require('path');

module.exports = {
    modulename: 'views',
    build: {
        rootPath: path.resolve(__dirname, '../dist/'),
        assetsPublicPath: '../../',
        assetsSubDirectory: 'assets'
    },
    dev: {
        serverPublicPath: '/',
        assetsPublicPath: '/',
        host: 'localhost',
        port: '2222',
        proxy: {
            context: ['/tpl', '/scan', '/act', '/awd', '/order', '/user', '/saas_platform'],
            target: 'http://cs-yxc.saotianxia.vip',
            changeOrigin: true,
            logLevel: 'debug'
        },
        overlay: true,
        assetsSubDirectory: '/'
    }
}