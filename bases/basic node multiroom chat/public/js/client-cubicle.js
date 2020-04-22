'use strict';

//connection to socket
// eslint-disable-next-line no-undef
const socket = io('http://localhost:1338');

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

let uData = {
  name: null,
};

// append message to chat
const appendMessage = (data) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = data;
  messageContainer.append(messageElement);
};

if (messageForm != null) {
  // send  message
  messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', roomName, message);
    messageInput.value = '';
  });

  // username
  if (sessionStorage.getItem('clubQName') == null) {
    const name = prompt('what is your name?');
    sessionStorage.setItem('clubQName', name);
    uData.name = name;
  } else {
    uData.name = sessionStorage.getItem('clubQName');
  }

  appendMessage('You joined');
  socket.emit('new-user', roomName, uData.name);

  console.log(`emited new user ${uData.name}`);
}

//================= SOCKET IO =================
socket.on('connect', function () {
  socket.emit('join', 'Server Connected to Client');
});

socket.on('messages', function (data) {
  console.log(data);
});

socket.on('chat-message', function (data) {
  appendMessage(`${data.name}: ${data.message}`);
});

socket.on('user-connected', function (name) {
  appendMessage(`${name} connected`);
});

socket.on('user-disconnected', function (name) {
  appendMessage(`${name} disconnected`);
});
