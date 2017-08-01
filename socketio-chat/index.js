var app = require('express')();
var http = require('http').Server(app);

//socketio
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// whenever a new client connects to our app, the calback is triggered
io.on('connection', function(socket){

	socket.on('connection', function(user){
		console.log('user', user, 'has connected.');
	});

	socket.on('send message', function(message){
		// broadcasting the chat message to everyone
		// io.emit('chat message', msg);
		socket.broadcast.emit('load message', message)
	});

	socket.on('user is typing', function(user){
		socket.broadcast.emit('user is typing', user);
	});

	socket.on('user stopped typing', function(user){
		socket.broadcast.emit('user stopped typing', user);
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

