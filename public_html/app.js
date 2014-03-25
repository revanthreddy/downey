var express = require('express');
var app = express();
var server  = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');


server.listen(3000);
//io.set( 'origins', '*niwsc.com*:*' );
//app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());

//app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname + '/public')));
app.use(app.router);


io.sockets.on('connection', function(socket) {
    console.log("initialising socketio ..");
    
});


app.get('/', function(req, res) {
    res.sendfile(__dirname + '/cubeoperations.html');
});



app.get('/rotate', function(req, res) {
    io.sockets.emit("rotate", true);
    res.send("rotated");
});

app.get('/move' , function(req,res){
    io.sockets.emit("move", true);
    res.send("move");
});

app.get('/scale' , function(req,res){
    io.sockets.emit("scale", true);
    res.send("scale");
});

app.get('/negativescale' , function(req,res){
    io.sockets.emit("scale", true);
    res.send("scale");
});


