const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const express = require("express");
const publicPath = path.join(__dirname, "../public");
const app = express();
const server = http.createServer(app);
const {generateMessage, generateLocationMessage} = require("./utils/message");
const port = process.env.PORT || 3000;
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket)=>{
   console.log("New User connected");

   socket.emit("newMessage", generateMessage("admin", "Welcome to the chat app"));

   socket.broadcast.emit("newMessage", generateMessage("admin", "New user joined"));

   socket.on("createMessage", function(message, callback){
      let date = new Date();
      message.createdAt = date.getTime();
      console.log("Createmessage: ", message);
      io.emit("newMessage", generateMessage(message.from, message.text));
       callback();
   });

   socket.on("createLocationMessage", (coords) => {
      io.emit("newLocationMessage", generateLocationMessage("admin", coords.latitude, coords.longitude));
   });

   socket.on("disconnect", ()=>{
      console.log("client disconnected from server");
   });

});

server.listen(port, ()=>{
   console.log(`server is up and running on port ${port}`);
});