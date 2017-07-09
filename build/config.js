var path = require('path');
var pkg = require("../package.json");

module.exports = {
    build: {
        env: {
            NODE_ENV: '"production"'
        },
        index: path.resolve(__dirname, `../public/dist/${pkg.name}/${pkg.version}/index.html`),
        assetsRoot: path.resolve(__dirname, `../public/dist/${pkg.name}/`),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        productionSourceMap: true,
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report,
    },
    dev: {
        env: {
            NODE_ENV: '"dev"'
        },
        port: 6008,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
        },
        cssSourceMap: false,
    }
}
