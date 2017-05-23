var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);
var users = [];
io.on('connection', function(socket){
    console.log("we have a connection");   
    
    socket.on("new-message", function(msg)
    {
        console.log(msg);
        io.emit("receive-message", msg);
    });

    socket.on("setUser", function(data){
        console.log(data);
        io.emit("users", data);
    });
});

http.listen('3000', function(){
    console.log("we are connected");
});

