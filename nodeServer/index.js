//Node server which will handle socket io connections
const io = require('socket.io')(8000);

const users = {};

 io.on('connection', socket=>{
    //If a new user joins, let everyone know
     socket.on('new-user-joined', name=>{
         console.log("New user", name);
         users[socket.id] = name;
         socket.broadcast.emit('user-joined', name);
     });

     //If someone seds a message, broadcast it to other people
     socket.on('send', message=>{
         socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
     });

     //If someone leaves, broadcast it and delete the user
     socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
     })

 }) 
