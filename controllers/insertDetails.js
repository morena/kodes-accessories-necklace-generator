var express = require('express'),
    app = express();

exports.init = function(req, res){
  var order = req.body,
      image = req.body.image;
  res.render('insertDetails', {
    'title': 'Kodes necklaces generator',
    'message': 'Please insert your details',
    'order': order,
    'image': image
  });
}
