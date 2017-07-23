var socket = io();
socket.on("connect", function() {
    console.log("connected to server");
});

socket.on("newMessage", function(message){
    console.log(message);
    var li = $("<li></li>");
    //li.text(`${message.from}: ${message.text}`);
    li.text(message.from+ ": " +message.text);
    $("#messages").append(li);
});


socket.on("newLocationMessage", function(location){
    console.log(location);
    var li = $("<li></li>");
    var a = $("<a target='_blank'>My Current Location</a>");
    li.text(location.from + ":");
    a.attr("href", location.url);
    li.append(a);
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


var locationBtn = $("#send-location");

locationBtn.on("click", function(e){
   if(!navigator.geolocation){
       return alert("Geolocation is not supported in your browser");
   }

   navigator.geolocation.getCurrentPosition(function(position){
        //console.log(position);
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
   }, function(){
       alert("unable to fetch location")
   });
});