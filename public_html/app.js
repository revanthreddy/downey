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
    res.sendfile(__dirname + '/morecubeoperations.html');
});



app.post('/rotatexy', function(req, res) {
    io.sockets.emit("rotateXY", true);
    res.send("rotated");
});


app.post('/scalex' , function(req,res){
    io.sockets.emit("scalex", true);
    res.send("scalex");
});


app.post('/scalez' , function(req,res){
    io.sockets.emit("scalez", true);
    res.send("scalez");
});




