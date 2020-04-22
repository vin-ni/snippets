require('dotenv').config();
const params = require('./params.js');
const rooms = require('./rooms.js');
// const socketPort = process.env.SOCKETPORT || 1338;
// const io = require('socket.io')(socketPort);

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('join', (data) => {
      console.log(data);
      socket.emit('messages', 'Socket Connected to Server');
    });

    // ============ Main Floor ============ //
    socket.on('new-user', (room, name) => {
      socket.join(room);
      rooms[room].users[socket.id] = name;
      socket.to(room).broadcast.emit('user-connected', name);

      if (params.logRoomsOnConnect) {
        console.log(rooms);
      }
    });

    socket.on('send-chat-message', (room, message) => {
      console.log('recieving chat message');
      socket.to(room).broadcast.emit('chat-message', { message: message, name: rooms[room].users[socket.id] });
    });

    socket.on('disconnect', () => {
      getUserRooms(socket).forEach((room) => {
        socket.to(room).broadcast.emit('user-disconnected', rooms[room].users[socket.id]);
        delete rooms[room].users[socket.id];
      });
    });

    function getUserRooms(socket) {
      return Object.entries(rooms).reduce((names, [name, room]) => {
        if (room.users[socket.id] != null) names.push(name);
        return names;
      }, []);
    }

    socket.on('messages', (data) => {
      socket.emit('broad', data);
    });
  });

  return io;
};

// old sockets
// io.on('connection', (socket) => {
//   // If someone goes to the bathroom send him the current status of rooms
//   // socket.on('bathroom-connect', function () {
//   //   io.emit('bathrooms', roomsArr);
//   // });
//   // // If a new user connects to a chatroom
//   // socket.on('room-connect', function (room) {
//   //   roomsArr[room] = true;
//   //   io.emit('bathrooms', roomsArr);
//   // });
//   // // If a user connects to a chatroom
//   // socket.on('room-disconnect', function (room) {
//   //   roomsArr[room] = false;
//   //   io.emit('bathrooms', roomsArr);
//   // });
//   // // If someone sends a message
//   // socket.on('sendMessage', (msg) => {
//   //   socket.broadcast.emit('newMessage', msg);
//   // });
// });
