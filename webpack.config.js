module.exports = {
  entry: './src/slid3r.js',
  output: {
    library: 'slid3r',
    libraryTarget: 'umd',
    filename: 'dist/slid3r.js',
  },
  externals: {
    d3 : {
      commonjs: "d3",
      amd: "d3",
      root: "d3" // indicates global variable
    }
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