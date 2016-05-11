var express = require('express'),
    app = express(),
    json;
    //$ = require('jquery')(require("jsdom").jsdom().parentWindow);//can't use jquery on the server
/**
 * Respond to user click and capture the item they want to change colour for
 */
exports.init = function(req, res){
  var colours = json;

  res.render('confirm', {
    'title': 'Kodes necklaces generator',
    'message': 'Customise your Kodes necklace'
  });
}
