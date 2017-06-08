/*global __dirname, module webpack true*/
let path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const marked = require("marked");
const renderer = new marked.Renderer();
let config = {
    entry: {
        main: './main.js',
    },
    output: {
        // 输出的文件名, [name] 会取entry入口中的名称
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'docs')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                include: [path.resolve(__dirname)],
                exclude: /node_modules/,
                use: [{
                    loader: "style-loader"
                }, {
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            },
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, "./")],
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            },
            {
                test: /\.md$/,
                use: [{
                        loader: 'html-loader'
                    }, {
                        loader: 'markdown-loader',
                        options: {
                            pedantic: true,
                            renderer
                        }
                    }]
            }
        ]
    },
    plugins: [
        extractSass,
        // 生成html骨架
        new HtmlWebpackPlugin({
            // 生成的html的文件名及路径
            filename: 'docs/index.html',
            template: 'mian.ejs',
            chunks: ['main']
        }),
        new CopyPlugin([
            {
                from: 'notes',
                to: 'docs'
            }
        ])
    ]
};

module.exports = config;