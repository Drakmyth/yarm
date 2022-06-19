"use strict";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";
const devtool = devMode ? "inline-source-map" : false;

const mode = devMode ? "development" : "production";
const outPath = path.resolve(__dirname, "./out");
const tsLoader = {
    test: /\.tsx?$/,
    loader: "ts-loader"
};
const tsExtensions = [".ts", ".tsx", ".js"];

const electronMainConfig = {
    mode: mode,
    target: "electron-main",
    entry: path.resolve(__dirname, "./src/electron/main.ts"),
    output: {
        path: outPath,
        filename: "electron.bundle.js"
    },
    module: {
        rules: [tsLoader]
    },
    resolve: {
        extensions: [...tsExtensions]
    },
    node: {
        __dirname: false
    },
    devtool: devtool
};

const electronPreloadConfig = {
    mode: mode,
    target: "electron-preload",
    entry: path.resolve(__dirname, "./src/electron/preload.ts"),
    output: {
        path: outPath,
        filename: "preload.bundle.js"
    },
    module: {
        rules: [tsLoader]
    },
    resolve: {
        extensions: [...tsExtensions]
    },
    devtool: devtool
};

const electronRendererConfig = {
    mode: mode,
    target: "electron-renderer",
    entry: path.resolve(__dirname, "./src/website/App.tsx"),
    output: {
        path: outPath,
        filename: "website.bundle.js"
    },
    module: {
        rules: [
            tsLoader,
            {
                test: /\.css$/i,
                use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader, "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: [...tsExtensions]
    },
    devtool: devtool,
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/website/index.html",
            inject: "body"
        })
    ].concat(
        devMode
            ? []
            : [
                  new MiniCssExtractPlugin({
                      filename: "[name].[contenthash].css"
                  })
              ]
    )
};

module.exports = [electronMainConfig, electronPreloadConfig, electronRendererConfig];
