const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
    mode: mode,
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /server/],
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: 'body',
            template: './index.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: './assets', to: './assets' }
            ]
        }),
        new webpack.DefinePlugin({
            environment: JSON.stringify(mode)
        })
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: './dist'
    }
}