"use strict";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        electron: "./src/electron/main.ts",
        website: "./src/website/index.tsx"
    },
    output: {
        path: path.resolve(__dirname, "./out"),
        filename: "[name].bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/website/index.html",
            inject: "body",
            chunks: ["website"]
        })
    ],
    target: "electron-main",
    node: {
        __dirname: false
    }
};
