const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
    const isProduction = argv.mode === 'production'

    return {
        name: 'static_js_files',
        entry: {
            sw_firebase_auth: './static/sw_firebase_auth.js'
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, './static/dist')
        },
        resolve: {
            alias: {
                '~': path.resolve(__dirname, './')
            },
            extensions: ['.js']
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development')
            })
        ],
        optimization: {
            minimize: true
        }
    }
}

module.exports = config
