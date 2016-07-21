var express = require('express'),
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser'),
    insertDetails = require("./controllers/insertDetails"),
    chooseColours = require("./controllers/chooseColours"),
    confirmOrder = require("./controllers/confirmOrder");
    //domtoimage = require('dom-to-image');
    //paypalSDK = require('paypal-rest-sdk'),
    //paypal = require("./controllers/paypal");

app.listen(process.env.PORT || 5000); //for heroku to work
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//app.use(express.cookieParser('kodes-accessories'));
//app.use(express.session());

app.listen(app.get('port'), function () {
    console.log("Express server listening");
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  //res.send('hello world');
  res.render('index', {
    'title': 'Kodes Necklaces Generator'
  });
});
app.post("/insert-details", insertDetails.init);
app.get("/choose-colours", chooseColours.init);
app.post("/confirm-order", confirmOrder.init);
//app.get("/paypal", paypal.init);
