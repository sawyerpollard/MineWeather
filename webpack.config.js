const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');


module.exports = (env) => {
    const target = env.target ? env.target : 'chrome';
    return {
        mode: 'production',
        entry: {
            newtab: './src/newtab/newtab.ts',
            popup: './src/popup/popup.ts',
            background: './src/background.ts',
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: './src/newtab/newtab.html',
                filename: './newtab.html',
                chunks: ['newtab'],
            }),
            new HtmlWebpackPlugin({
                template: './src/popup/popup.html',
                filename: './popup.html',
                chunks: ['popup'],
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
            new CopyWebpackPlugin({
                patterns: [
                    { from: 'src/icons', to: 'icons' },
                    { from: 'src/images', to: 'images' },
                    { from: 'src/_locales', to: '_locales' },
                    { from: `src/manifest.${target}.json`, to: 'manifest.json' },
                ],
            }),
            new PurgecssPlugin({
                paths: glob.sync('./src/**/*', { nodir: true }),
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                        },
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin(),
            ],
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist'),
        },
    };
};
