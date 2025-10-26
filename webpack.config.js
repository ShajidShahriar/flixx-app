// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack'); 

module.exports = {
  // 1. Set the mode to development for a working server
  mode: 'development',
  
  // 2. The entry point (where your app starts) - FIXED from the last step
  entry: './src/js/script.js', 
  
  output: {
    // The bundled file
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // Clears the /dist folder on each build
    clean: true,
  },
  
  devServer: {
    // Tells the dev server where to "serve" files from
    static: path.resolve(__dirname, 'dist'),
    // Automatically open the browser
    open: true,
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
      {
        // For any file ending in .css
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        // For image files and other assets
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  
  plugins: [
    // This plugin will generate an index.html in /dist
    // You need one of these for EVERY HTML page you have!
    new Dotenv(),
    
    new HtmlWebpackPlugin({
      title: 'Flixx | Home',
      filename: 'index.html',
      template: './src/index.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Flixx | Shows',
      filename: 'shows.html',
      template: './src/shows.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Flixx | Movie Details',
      filename: 'movie-details.html',
      template: './src/movie-details.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Flixx | Show Details',
      filename: 'tv-details.html',
      template: './src/tv-details.html',
    }),
    new HtmlWebpackPlugin({
      title: 'Flixx | Search',
      filename: 'search.html',
      template: './src/search.html',
    }),
  ],
};