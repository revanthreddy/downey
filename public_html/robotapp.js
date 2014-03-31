var express = require('express');
var app = express();
var server  = require('http').createServer(app);
var path = require('path');

var command = '';


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

app.get('/command' , function(req,res){
    return res.status(200).send(""+command);
});

app.put('/command', function(req,res){
    console.log(req.body);
    command = req.body;
    return res.status(200).send("command set to "+command);
});