var express = require('express');
var app = express();
var server  = require('http').createServer(app);
var io = require('socket.io').listen(server);
var path = require('path');

var command = '';

var beacon1 = {"distance" : 10};
var beacon2 = {"distance" : 10};
var beacon3 = {"distance" : 10};
var beacon4 = {"distance" : 10};

server.listen(80);
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
    res.sendfile(__dirname + '/cubephong.html');
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

app.post('/togglerotation' , function(req,res){
    io.sockets.emit("togglerotation", true);
    res.send("togglerotation");
});


app.get('/command' , function(req,res){
    return res.status(200).send(""+command);
});

app.put('/command', function(req,res){
    console.log(req.query.coords);
    command = req.query.coords;
    return res.status(200).send("command set to "+command);
});




app.get('/beacon/:id', function(req,res){
    var id = req.param("id");
    if(id == 1)
        return res.status(200).send(beacon1);
    if(id == 2)
        return res.status(200).send(beacon2);
    if(id == 3)
        return res.status(200).send(beacon3);
    if(id == 4)
        return res.status(200).send(beacon4);
    return res.status(404).send("beacon not found");
});

app.put('/beacon/:id', function(req,res){
    var id = req.param("id");
    var distance = req.body.distance;
    if(id == 1){
        beacon1.distance = distance;
        return res.status(200).send(beacon1);
    }
    if(id == 2){
        beacon2.distance = distance;
        return res.status(200).send(beacon2);
    }
    if(id == 3){
        beacon3.distance = distance;
        return res.status(200).send(beacon3);
    }
    if(id == 4){
        beacon4.distance = distance;
        return res.status(200).send(beacon4);
    }
    return res.status(404).send("beacon not found");
});