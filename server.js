var express = require('express');
var app = express();

var http = require('http'),
    server = http.createServer(app),
    socket = require('socket.io').listen(server);

app.use(express.static(__dirname + '/app/templates'));
app.use('/scripts/vendor', express.static(__dirname + '/node_modules'));
app.use('/scripts/js', express.static(__dirname + '/app/scripts/js'));
app.use('/styles/css', express.static(__dirname + '/app/styles/css'));

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

socket.sockets.on('connection', function(socket){
  console.log('connection arrived');
  socket.on('message', function(data) {
    socket.broadcast.emit('message', {
      message:data.message,
      username : data.username
    })
  });
});

var APP_PORT = 3000;
server.listen(APP_PORT, hellworld);

function hellworld() {
  console.log("Up and running!");
}
