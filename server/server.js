// const express = require("express");
// const app = express();
// const server = require("http").createServer(app);
// const io = require('socket.io')(server)
// // const socketManage = require('./handlers/socket.manage')(io)
// const socketManage = require('./handlers/message.handler')(io)

// io.on('connection', socketManage )

// server.listen(6868, () => console.log("server running on port:" + 6868));

const io = require("socket.io")();
const messageHandler = require("./handlers/message.handler");

let currentUserId = 2;
const uuidv1 = require("uuid/v1");

const users = {};

function createUserAvatarUrl() {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/140/140/any`;
}

io.on("connection", socket => {
  console.log("a user connected!");
  console.log(socket.id);

  users[socket.id] = { userId: uuidv1() };

  socket.on("join", username => {
    users[socket.id].username = username;
    users[socket.id].avatar = createUserAvatarUrl();
    messageHandler.handleMessage(socket, users);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on("connection", socket => {
  console.log("a user connected!");
  console.log(socket.id);
  socket.on("message", message => {
    console.log(message);
    io.emit("message", message);
  });
});

io.listen(6868, () => console.log("server running on port:" + 6868));