module.exports = {
  entry: './src/slid3r.js',
  output: {
    library: 'slid3r',
    libraryTarget: 'assign',
    filename: 'dist/slid3r.js',
  },
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