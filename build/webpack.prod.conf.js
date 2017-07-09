const os = require('os');
const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge')
const UglifyJsparallelPlugin = require('webpack-uglify-parallel');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let baseConfig = require('./webpack.base.conf.js');
let config = require('./config');
let utils = require('./utils');



let webpackConfig = merge(baseConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        filename: utils.assetsPath('js/[name].[chunkhash:7].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash:7].js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.build.env
        }),
        new UglifyJsparallelPlugin({
            workers: os.cpus().length,
            mangle: true,
            compress: {
                warnings: false
            },
            comments: false,
            sourceMap: true
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash:7].css')
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: './index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        })
    ]
});

if (config.build.bundleAnalyzerReport) {
    let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}



module.exports = webpackConfig;
