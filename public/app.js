var express = require('express');
var app = express();
var server  = require('http').createServer(app);

server.listen(3000);
//io.set( 'origins', '*niwsc.com*:*' );
//app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

app.use(express.cookieParser());

app.use(express.static(__dirname + '/public'));
app.use(app.router);


