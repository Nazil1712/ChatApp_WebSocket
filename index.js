const express = require("express");
const http = require("http");
const path = require("path");
const app = express();
const PORT = 3000;
const { Server } = require("socket.io");

const server = http.createServer(app);

/* Now, this ${io} will handle ALL my sockets!! */
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("user-message", (message) =>{
    io.emit("message-for-all",message)
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("./public/index.html"));
});

server.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});
