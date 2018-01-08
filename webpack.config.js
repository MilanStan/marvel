var path=require('path');

module.exports={
    entry: {
        app: "./app/js/app.js",
        //Lazy: "./app/js/modules/laziloading.js"
    },
    output: {
        path: path.resolve(__dirname, 'app/js'),
        filename: "[name].bundled.js"
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader', 
                query:{
                    presets: ['es2015']
                },
                test: /\.js$/,
                exclude: /node_modules/
            }
        ]
    }
}

