const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const express = require("express");
const publicPath = path.join(__dirname, "../public");
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
let io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", (socket)=>{
   console.log("New User connected");

   socket.on("createMessage", function(message){
      let date = new Date();
      message.createdAt = date.getTime();
      console.log(message);
   });

   socket.emit("newMessage", {
      from: "abc@example.com",
       text: "hey this is another test test",
       createdAt: new Date().getTime()
   });

   socket.on("disconnect", ()=>{
      console.log("client disconnected from server");
   });

});

server.listen(port, ()=>{
   console.log(`server is up and running on port ${port}`);
});