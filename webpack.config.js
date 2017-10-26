module.exports = {
  entry: './src/slid3r.js',
  output: {
    library: 'slid3r',
    libraryTarget: 'umd',
    filename: 'dist/slid3r.js',
  },
  // devtool: 'source-map',  
  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};