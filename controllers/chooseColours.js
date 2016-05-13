var express = require('express'),
    app = express(),
    fs = require("fs"),
    json;
    //$ = require('jquery')(require("jsdom").jsdom().parentWindow);//can't use jquery on the server

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file){

    var filepath = __dirname + '/' + file;
    return readJsonFileSync(filepath);
}

//assume that config.json is in application root

json = getConfig('../data/colours.json');

/**
 * Respond to user click and capture the item they want to change colour for
 */
exports.init = function(req, res){
  //console.log(req.body);
  var colours = json,
      firstName = req.body.firstName,
      lastName = req.body.lastName,
      email = req.body.email,
      address = req.body.address;

  res.render('choose-colours', {
    'title': 'Kodes necklaces generator',
    'message': 'Customise your Kodes necklace',
    'colours': colours.colours,
    'firstName': firstName,
    'lastName': lastName,
    'email': email,
    'address': address
  });
}
