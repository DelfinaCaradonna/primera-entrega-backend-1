const http = require("http");
const app = require("./src/app");
const setupAndGetWebSocket = require("./src/config/websocket");

require("dotenv").config();

const PORT = process.env.PORT;

const server = http.createServer(app);

setupAndGetWebSocket(server);

server.listen(PORT, () => {
  console.log(`Servidor escuchando el puerto ${PORT}`);
});
