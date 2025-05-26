const { Server } = require("socket.io");

let io = undefined;

const setupAndGetWebSocket = (server) => {
  if (io === undefined) {
    io = new Server(server);

    io.on("connection", (socket) => {
      console.log(`Usuario conectado ${socket.id}`);
    });

    return io;
  } else {
    return io;
  }
};

module.exports = setupAndGetWebSocket;
