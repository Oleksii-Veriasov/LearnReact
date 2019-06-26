module.exports = {
   mode: 'development',
   entry : "./app/index.js",
   output: {
      filename: "./bundle.js"
   },
   module: {
      rules: [ {
         test: /\.(js|jsx)$/,
         exclude: [ /node_modules/ ],
         use: {
            loader: "babel-loader",
            options: {
               presets: [ "@babel/preset-react", '@babel/preset-env' ]
            }
         },
      } ]
   },
   
   devServer: {
      open: true,
      openPage: "",
      historyApiFallback: true
   }
};