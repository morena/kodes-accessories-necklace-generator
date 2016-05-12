var express = require('express'),
    app = express(),
    json,
		email = require("emailjs"),
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

exports.init = function(req, res){
	var json = getConfig('../data/config.json'),
			config = json,
			postObj = req.body,
			messageText = '',
			sendEmails = config.sendEmail,
			templateMesage = 'Customise your Kodes necklace';

	var server  = email.server.connect({
	   user:    config.user,
	   password:config.password,
	   host:    config.host,
	   ssl:     true
	});

	for (var item in postObj){
		messageText += item + ': ' + postObj[item] + '\n';
	}

	if(sendEmails == true){
		// send the message and get a callback with an error or details of the message that was sent
		server.send({
		   text:    messageText,
		   from:    "Kodes Order Taker <kodes@morenafiore.com>",
		   to:      "Morena <hello@morenafiore.com>",
		   subject: "New Kodes necklace order"
		}, function(err, message) {
			console.log(message);
			console.log(err || message);
			if( message){
				templateMesage = req.body.firstName + ' thank you for your order!';
			}
		});
	}else{
		templateMesage = 'Email sending is disabled';
	}

  res.render('confirm', {
    'title': 'Kodes necklaces generator',
    'message': templateMesage
  });
}
