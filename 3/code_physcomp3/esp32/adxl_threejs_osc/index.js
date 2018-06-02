const express = require("express");
const app = express();
const server = app.listen(3000);
var path = require("path");
const io = require("socket.io")(server);
var osc = require('node-osc');

//expose the local public folder for inluding files js, css etc..
app.use(express.static("public"));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var oscServer = new osc.Server(9999, '0.0.0.0');
oscServer.on("message", function(data, rinfo) {
    io.sockets.emit("data", data);
    console.log(data);
});

