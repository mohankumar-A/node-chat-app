const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const express = require("express");
const publicPath = path.join(__dirname, "../public");
const app = express();
const server = http.createServer(app);
const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");
const port = process.env.PORT || 3000;
let io = socketIO(server);
let users = new Users();
app.use(express.static(publicPath));

io.on("connection", (socket)=>{
   console.log("New User connected");

   socket.on("join", (params, callback)=>{
      console.log(params);
      if(!isRealString(params.name) || !isRealString(params.room)){
         return callback("name and room are required");
      }

      socket.join(params.room);
      users.removeUser(socket.id);
      let userList = users.addUser(socket.id, params.name, params.room);
      io.to(params.room).emit("updateUserList", users.getUserList(params.room));
      socket.emit("newMessage", generateMessage("admin", "Welcome to the chat app"));
      socket.broadcast.to(params.room).emit("newMessage", generateMessage("admin", `${params.name} has joined`));
      callback();
    });

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
      var user = users.removeUser(socket.id);
      if(user){
         io.to(user.room).emit("updateUserList", users.getUserList(user.room));
         io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left.`));
      }
      console.log("client disconnected from server");
   });

});

server.listen(port, ()=>{
   console.log(`server is up and running on port ${port}`);
});