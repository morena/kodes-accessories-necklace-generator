var express = require('express'),
    path = require('path'),
    app = express(),
    bodyParser = require('body-parser');
    chooseColours = require("./controllers/chooseColours"),
    confirmOrder = require("./controllers/confirmOrder");

app.set('port', 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(app.get('port'), function () {
    console.log("Express server listening on port %s.", app.get('port'));
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  //res.send('hello world');
  res.render('index', {
    'title': 'Kodes Necklaces Generator'
  });
});

app.get("/choose-colours", chooseColours.init);
app.post("/confirm-order", confirmOrder.init);
