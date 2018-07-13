
const path = require('path');

module.exports = {
  entry: {
      bands:['./client/js/source/band.js']
      
    },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'public/assets/js/bin/')
  },
  mode:"production",
  watch:true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }

};