"use strict";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const outDir = "./out";

const electronMainConfig = {
    mode: "development",
    entry: "./src/electron/main.ts",
    output: {
        path: path.resolve(__dirname, outDir),
        filename: "electron.bundle.js"
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
    target: "electron-main",
    node: {
        __dirname: false
    }
};

const electronRendererConfig = {
    mode: "development",
    entry: "./src/website/App.tsx",
    output: {
        path: path.resolve(__dirname, outDir),
        filename: "website.bundle.js"
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
            inject: "body"
        })
    ]
};

module.exports = [electronMainConfig, electronRendererConfig];
