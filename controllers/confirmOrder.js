var express = require('express'),
    app = express(),
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
  if( undefined == process.env.emailusername ||
      undefined == process.env.emailpassword){

    	var json = getConfig('../data/config.json'),
    			config = json;

    }else{
      var config = {};
      config.sendEmail = true;
    }
		var postObj = req.body,
      order = JSON.parse(req.body.order),
			messageText = '',
			sendEmails = true,
			templateMesage = 'Customise your Kodes necklace';

	var server  = email.server.connect({
	   user:    process.env.emailusername || config.user,
	   password:process.env.emailpassword || config.password,
	   host:    config.host,
	   ssl:     true
	});

	for (var item in order){
		messageText += item + ': ' + order[item] + '\n';
	}
	if(sendEmails == true && messageText !== ''){
		// send the message and get a callback with an error or details of the message that was sent
		server.send({
		   text:    messageText,
		   from:    "Kodes Order Taker <kodes@morenafiore.com>",
		   to:      "Morena <morenafiore@gmail.com>, " + req.body.firstName + '<' + req.body.email + '>',
		   subject: "New Kodes necklace order"
		}, function(err, message) {
			console.log(message);
			console.log(err || message);
			if(err == null){
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
