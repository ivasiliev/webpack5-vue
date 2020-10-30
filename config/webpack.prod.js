const paths = require('./paths');
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: 'production',
    devtool: false,
    output: {
        path: paths.dist,
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[id].[chunkhash].js'
    },
    plugins: [
        // extract css into its own file
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: false, importLoaders: 1}},
                    {loader: 'postcss-loader', options: {sourceMap: false}},
                    {loader: 'sass-loader', options: {sourceMap: false}},
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: {
            name: 'runtime',
        },
    },
});