var express = require('express');
var app = express();
var server  = require('http').createServer(app);
var path = require('path');

var currentCommand = 0;


server.listen(80);
//io.set( 'origins', '*niwsc.com*:*' );
//app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());

//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname + '/public')));
app.use(app.router);


app.get('/', function(req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.get('/command', function(req, res) {
    console.log("GET");
    var command = currentCommand;
    currentCommand = 0;
    return res.status(200).send(""+command);
    
});




app.post('/left', function(req, res) {
    currentCommand = 1;
    return res.status(200).send(""+currentCommand);
});

app.post('/right', function(req, res) {
    currentCommand = 2;
    return res.status(200).send(""+currentCommand);
});

app.post('/back', function(req, res) {
    currentCommand = 3;
    return res.status(200).send(""+currentCommand);
});





