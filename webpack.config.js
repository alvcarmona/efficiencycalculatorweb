//require our dependencies
var path = require('path')
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')
var CleanObsoleteChunks = require('webpack-clean-obsolete-chunks');


module.exports = {
    //the base directory (absolute path) for resolving the entry option
    context: __dirname,
    //the entry point we created earlier. Note that './' means
    //your current directory. You don't have to specify the extension  now,
    //because you will specify extensions later in the `resolve` section
    entry: './effcalculator/frontend/assets/js/index',

    output: {
        //where you want your compiled bundle to be stored
        path: path.resolve('./effcalculator//frontend/assets/bundles/'),
        //naming convention webpack should use for your files
        filename: '[name]-[hash].js',
    },

    plugins: [
        //tells webpack where to store data about your bundles.
        new BundleTracker({filename: './effcalculator/webpack-stats.json'}),
        //makes jQuery available in every module
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        new CleanObsoleteChunks({
            verbose: true
        })

    ],

    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react'],
                        // plugins: [require('babel-plugin-transform-object-rest-spread')]
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    plugins: [
                        'transform-runtime',
                        'add-module-exports',
                        'transform-decorators-legacy',
                    ],
                    presets: ['es2015', 'react', 'stage-1'],
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            }
        ]/*
         loaders: [
         //a regexp that tells webpack use the following loaders on all
         //.js and .jsx files
         {test: /\.jsx?$/,
         //we definitely don't want babel to transpile all the files in
         //node_modules. That would take a long time.
         exclude: /node_modules/,
         //use the babel loader
         loader: 'babel-loader',
         query: {
         //specify that we will be dealing with React code
         presets: ['react']
         }
         }
         ]*/
    },

    resolve: {
        //tells webpack where to look for modules
        modules: ['node_modules'],
        //extensions that should be used to resolve modules
        extensions: ['*', '.js', '.jsx']
    }
}
