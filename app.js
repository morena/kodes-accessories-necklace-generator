var express = require('express'),
    path = require('path'),
    app = express();
    
app.set('port', 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, '/public')));

app.listen(app.get('port'), function () {
    console.log("Express server listening on port %s.", app.get('port'));
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world');
});
