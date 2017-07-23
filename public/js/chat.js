var socket = io();

function scrollToBottom(){
  var messages = $("#messages");
  var newMessage = messages.children("li:last-child");
  var clientHeight = messages.prop("clientHeight");
  var scrollTop = messages.prop("scrollTop");
  var scrollHeight = messages.prop("scrollHeight");
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
      messages.scrollTop(scrollHeight);
  }
};

socket.on("updateUserList", function(users){
    console.log(users);
    var template = $("#users-template").html();

    var html = Mustache.render(template, {users:users});
    $("#users").html(html);
});


socket.on("connect", function() {
    var params = $.deparam(window.location.search);
    socket.emit("join", params, function(err){
        if(err){
            alert(err);
            window.location.href = "/"
        } else {
            console.log("Join Room Success");
        }
    });
});

socket.on("newMessage", function(message){
    var template = $("#message-template").html();

    var html = Mustache.render(template, {
       from: message.from,
       createdAt: new moment(message.createdAt).format("h:mm a"),
       text: message.text
    });
    $("#messages").append(html);
    scrollToBottom();
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