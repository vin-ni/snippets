'use strict';

//connection to socket
// const socket = io('http://localhost:1338');

// const messageContainer = document.getElementById('message-container');
// const messageForm = document.getElementById('send-container');
// const messageInput = document.getElementById('message-input');

// //================= SOCKET IO =================
// socket.on('connect', function (data) {
//   socket.emit('join', 'Server Connected to Client');
// });

// socket.on('messages', function (data) {
//   console.log(data);
// });

// socket.on('server-global-message', function (data) {
//   appendMessage(data);
// });

// // send global message
// messageForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   const message = messageInput.value;
//   socket.emit('client-global-message', message);
//   messageInput.value = '';
// });

// const appendMessage = (data) => {
//   const messageElement = document.createElement('div');
//   messageElement.innerText = data;
//   messageContainer.append(messageElement);
// };

