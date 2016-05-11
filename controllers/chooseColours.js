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
  var colours = json;

  res.render('choose-colours', {
    'title': 'Kodes necklaces generator',
    'message': 'Customise your Kodes necklace',
    'colours': colours.colours
  });
}
