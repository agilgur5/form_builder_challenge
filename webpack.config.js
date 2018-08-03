var commonEntry = ['./polyfills.es6']
// webpack's configuration
module.exports = {
  entry: {
    main: commonEntry.concat('./main.es6')
  },
  output: {
    path: __dirname + '/build', // where builds go
    filename: '[name].bundle.js'
  },
  resolve: {
    // resolve from package root as well, so utils/... , etc works
    modules: [__dirname, 'node_modules']
  },
  module: {
    rules: [
      // use ! to chain loaders; note that the first loader is rightmost (RtL)
      {
        test: /\.es6$/,
        loader: 'babel-loader'
      },
      {
        test: /\.pcss$/,
        loader: 'style-loader!css-loader!postcss-loader'
      },
      {
        test: /\.pcssm$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1!postcss-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.cssm$/,
        loader: 'style-loader!css-loader?modules'
      }
    ]
  },
  mode: process.env.NODE_ENV
}
