var socket = io();
socket.on("connect", function() {
    console.log("connected to server");

    socket.on("newMessage", function(message){
        console.log(message);
    });

    socket.emit("createMessage", {
        from: "abc@example.com",
        text: "hey this is emitted text"
    });
});

socket.on("disconnect", function(){
    console.log('Disconnected from server');
});