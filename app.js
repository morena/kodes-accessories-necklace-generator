var express = require('express'),
    path = require('path'),
    app = express(),
    chooseColours = require("./controllers/chooseColours");

app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, '/public')));
//app.use(express.static('public'));

app.listen(app.get('port'), function () {
    console.log("Express server listening on port %s.", app.get('port'));
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  //res.send('hello world');
  res.render('index', {
    'title': 'My Site',
    'message': 'hello'
  });
});

app.get("/choose-colours", chooseColours.init);
