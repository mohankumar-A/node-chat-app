var socket = io();
socket.on("connect", function() {
    console.log("connected to server");
});

socket.on("newMessage", function(message){
    console.log(message);
    var li = $("<li></li>");
    li.text(`${message.from}: ${message.text}`);
    $("#messages").append(li);
});

// socket.emit("createMessage", {
//     from: "Mohan",
//     text: "Hi"
// }, function(data){
//     console.log("got it", data);
// });

socket.on("disconnect", function(){
    console.log('Disconnected from server');
});

$("#message-form").on("submit", function(e){
    e.preventDefault();

    socket.emit("createMessage", {
        from: "User",
        text: $("[name=message]").val()
    }, function(){

    });

});
