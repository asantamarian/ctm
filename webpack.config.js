
const path = require('path');

module.exports = {
    mode:"development",
  entry: {
      bands:['./client/js/source/band.js']
      
    },
  output: {
    filename: '[name].min.js',
    path: path.join(__dirname, 'public/assets/js/bin/')
  }

};
///\.min\.js$/