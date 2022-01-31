const path = require('path')

const config = {
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
    mode: 'none',
    optimization: {
        minimize: true
    }
}

module.exports = config
