// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

// Routing
// app.use(express.static(path.join(__dirname, 'public')));

const uuidv1 = require("uuid/v1");
// chatroom
const messageHandler = require("./handlers/message.handler");

let currentUserId = 2;
const users = {};

function createUsersOnline() {
  const values = Object.values(users);
  const onlyWithUsernames = values.filter(u => u.username !== undefined);
  return onlyWithUsernames;
}

function createUserAvatarUrl() {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/${rand1}/${rand2}/any`;
}

io.on("connection", socket => {
  console.log("a user connected!", currentUserId);
  console.log(socket.id);
  // users[socket.id] = { userId: uuidv1() };
  users[socket.id] = { userId: currentUserId++ };
  socket.on("join", username => {
    users[socket.id].username = username;
    users[socket.id].avatar = createUserAvatarUrl();
    messageHandler.handleMessage(socket, users);
  });
  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("action", { type: "users_online", data: createUsersOnline() });
  });
  socket.on("action", action => {
    switch (action.type) {
      case "server/hello":
        console.log("Got hello event", action.data);
        socket.emit("action", { type: "message", data: "Good day!" });
        break;
      case "server/join":
        console.log("Got join event", action.data);
        users[socket.id].username = action.data;
        users[socket.id].avatar = createUserAvatarUrl();
        io.emit("action", {
          type: "users_online",
          data: createUsersOnline()
        });
        break;
      case "MESSEGE":
        console.log("Got a message", action.data);
    }
  });
});