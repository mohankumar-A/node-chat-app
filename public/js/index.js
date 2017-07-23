var socket = io();
socket.on("connect", function() {
    console.log("connected to server");
});

socket.on("newMessage", function(message){
    console.log(message);

    var template = $("#message-template").html();

    var html = Mustache.render(template, {
       from: message.from,
       createdAt: new moment(message.createdAt).format("h:mm a"),
       text: message.text
    });
    $("#messages").append(html);
});


socket.on("newLocationMessage", function(message){
    console.log(location);

    var template = $("#location-message-template").html();

    var html = Mustache.render(template, {
       from: message.from,
        createdAt: new moment(message.createdAt).format("h:mm a"),
        url: message.url
    });
    $("#messages").append(html);
    // var li = $("<li></li>");
    // var a = $("<a target='_blank'>My Current Location</a>");
    // var timeStamp = ;
    // li.text(location.from + " " + timeStamp.format("h:mm a") + ":");
    // a.attr("href", location.url);
    // li.append(a);
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