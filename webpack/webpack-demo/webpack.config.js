const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    // entry:"./src/index.js",
    // 管理输出
    entry:{
        app:'./src/index.js',
        print:"./src/print.js"
    },
    devtool:'inline-source-map',
    devServer:{
      contentBase:'./dist'
    },
    // 使用插件
    plugins:[
        // new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title:"output Management"
        })
    ],
    output:{
        // filename:"bundle.js",
        // 管理输出
        filename:'[name].bundle.js',
        path:path.resolve(__dirname,'dist'),
        publicPath:"/"
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },{
                test:/\.(png|svg|jpg|gif)$/,
                use:['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                     'file-loader'
                     ]
            }
        ]
    }
}