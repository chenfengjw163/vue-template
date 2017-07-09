const webpack = require('webpack');
const _  = require('lodash');
const os = require('os');
const path = require('path');
const HappyPack = require('happypack');

let vueLoaderConfig = require('./vue-loader.conf');
let config = require('./config');
let utils = require('./utils');

let happyThreadPool = HappyPack.ThreadPool({ // eslint-disable-line
    size: os.cpus().length
});

function resolve (dir) {
  return path.join(__dirname, '../app', dir)
}

module.exports = {
    entry: {
        app: './app/app.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].js'),
        chunkFilename: utils.assetsPath('js/[name].js'),
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: [
            resolve(''),
            resolve('scss'),
            resolve('config'),
            resolve('util'),
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=js',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            }
        ]
    },
    plugins: [
        new HappyPack({
            id: 'js',
            threadPool: happyThreadPool,
            loaders: ['babel-loader?cacheDirectory=true'],
        }),
        new HappyPack({
            id: 'vue',
            threadPool: happyThreadPool,
            loaders: ['vue-loader'],
        })
    ]
};
