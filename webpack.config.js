"use strict";
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const outDir = "./out";

const cleanConfig = {
    output: {
        path: path.resolve(__dirname, outDir),
        clean: true
    }
};

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
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
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
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css"
        })
    ]
};

module.exports = [cleanConfig, electronMainConfig, electronRendererConfig];
