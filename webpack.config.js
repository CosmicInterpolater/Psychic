const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';

    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js',
        },
        resolve: {
            extensions: ['.js', '.jsx'],
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: 'babel-loader',
                },
                {
                    test: /\.s?css$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',  // ← This processes Tailwind
                        'sass-loader',     // ← This runs last (bottom-up)
                    ],
                },
            ],
        },
        devtool: isProduction ? 'source-map' : 'eval-source-map', // Source map configuration
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html',
            }),
        ],
        devServer: {
            static: './dist',
            hot: true,
        },
        mode: 'development',
    }
};
