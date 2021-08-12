const io = require("socket.io")();
const uuidv1 = require("uuid/v1");
const messageHandler = require("./handlers/message.handler");

let currentUserId = 2;
const users = {};

function createUserAvatarUrl() {
  const rand1 = Math.round(Math.random() * 200 + 100);
  const rand2 = Math.round(Math.random() * 200 + 100);
  return `https://placeimg.com/${rand1}/${rand2}/any`;
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
        const values = Object.values(users);
        io.emit("action", {
          type: "users_online",
          data: createUsersOnline()
        });
        break;
    }
  });
});

io.listen(3001);