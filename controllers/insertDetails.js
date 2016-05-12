var express = require('express'),
    app = express();

exports.init = function(req, res){
  res.render('insertDetails', {
    'title': 'Kodes necklaces generator',
    'message': 'Please insert your details'
  });
}
