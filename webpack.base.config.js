var path = require("path")
var webpack = require('webpack')
var BundleTracker = require('webpack-bundle-tracker')

module.exports = {
  context: __dirname,

  entry: './frontend/assets/js/index',

    output: {
        //where you want your compiled bundle to be stored
        path: path.resolve('./frontend/assets/bundles/'),
        //naming convention webpack should use for your files
        filename: '[name]-[hash].js',
    },

    plugins: [
        //tells webpack where to store data about your bundles.
        new BundleTracker({filename: './webpack-stats.json'}),
        //makes jQuery available in every module
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        }),
    ],

module: {
          rules: [
            {
                test: [/\.jsx$/, /\.js$/],
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
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }, {
                  test: /\.(jpe?g|png|gif|svg)$/,
                  use: [ {
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