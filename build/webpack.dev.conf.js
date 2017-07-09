const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

let baseConfig = require('./webpack.base.conf.js');
let config = require('./config');
let utils = require('./utils');


Object.keys(baseConfig.entry).forEach(function (name) {
  baseConfig.entry[name] = ['./build/dev-client'].concat(baseConfig.entry[name])
})

module.exports = merge(baseConfig, {
    module: {
        rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            inject: true
        }),
        new FriendlyErrorsPlugin(),
    ]
})

