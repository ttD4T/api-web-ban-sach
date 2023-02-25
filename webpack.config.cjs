const path = require('path');
const webpackNodeInternals = require('webpack-node-externals');

module.exports = {
   entry: {
      server: './js/server.js',
   },
   output: {
      path: path.join(__dirname, 'dist'),
      filename: 'main.js',
   },
   target: 'node',
   node: {
      __dirname: false,
      __filename: false,
   },
   externals: [webpackNodeInternals()],
   experiments: {
      topLevelAwait: true,
   },
   module: {
      rules: [
         {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env'],
               },
            },
         },
      ],
   },
};
