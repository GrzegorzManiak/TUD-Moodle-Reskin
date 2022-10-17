const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");

module.exports = {
    watch: true,
    entry: './src/index.ts',
    plugins: [new CompressionPlugin()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules|\.d\.ts$/
            },
            {
                test: /\.d\.ts$/,
                loader: 'ignore-loader'
            },         
        ],
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
