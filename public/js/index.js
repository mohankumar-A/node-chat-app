var socket = io();
socket.on("connect", function() {
    console.log("connected to server");
});

socket.on("newMessage", function(message){
    console.log(message);
    var li = $("<li></li>");
    //li.text(`${message.from}: ${message.text}`);
    var timeStamp = new moment(message.createdAt);
    li.text(message.from+ " " + timeStamp.format("h:mm a") + ": " +message.text);
    $("#messages").append(li);
});


socket.on("newLocationMessage", function(location){
    console.log(location);
    var li = $("<li></li>");
    var a = $("<a target='_blank'>My Current Location</a>");
    var timeStamp = new moment(location.createdAt);
    li.text(location.from + " " + timeStamp.format("h:mm a") + ":");
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

    var messageTextBox = $("[name=message]");
    socket.emit("createMessage", {
        from: "User",
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val("");
    });
});


var locationBtn = $("#send-location");

locationBtn.on("click", function(e){
   if(!navigator.geolocation){
       return alert("Geolocation is not supported in your browser");
   }
    locationBtn.attr("disabled", "disabled").text("Sending location...");
   navigator.geolocation.getCurrentPosition(function(position){
        //console.log(position);
       locationBtn.removeAttr("disabled").text("Send location");
        socket.emit("createLocationMessage", {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
   }, function(){
       locationBtn.removeAttr("disabled").text("Send location");
       alert("unable to fetch location")
   });
});