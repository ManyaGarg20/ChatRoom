// node server which will handle socket.io connections

// socket-io , uses http also
var http = require("http");
var server = http.createServer();
server.listen(7000 || process.env.PORT);

const io = require('socket.io')(server, {
        cors: {
          origin: '*',
        }
      }); 

      const users = {};

io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
      console.log("New User",  name);

     users[socket.id]=name;
    socket.broadcast.emit('user-joined',name);
    })

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:(message) ,name:users[socket.id]});
    })

    // when a user disconnects chats , this willl work
socket.on('disconnect',message=>{
    socket.broadcast.emit('left',users[socket.id]);
    delete users[socket.id]; // every connection in socket hs a unique id itself and not using name bcoz names may be duplicate for many users
    })
})

