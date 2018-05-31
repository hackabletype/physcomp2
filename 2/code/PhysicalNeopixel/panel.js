// This example shows how to use node-pixel using Johnny Five as the
// hook for the board.

var five = require("johnny-five");
var pixel = require("node-pixel");
var express = require('express');
var app = express();

var server = app.listen(3000);
app.use(express.static('public'));
var io = require('socket.io')(server);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

var opts = {};
opts.port = process.argv[2] || "";

var board = new five.Board(opts);
var strip = null;

var fps = 0.05; // how many frames per second do you want to try?

board.on("ready", function() {

    console.log("Board ready, lets add light");

    strip = new pixel.Strip({
        data: 3,
        length: 12,
        board: this,
        controller: "FIRMATA"
    });

    strip.on("ready", function() {

        console.log("Strip ready, let's go");
        io.on('connection', function(socket) {
            socket.on('message', function(msg) {
                strip.color(msg);
                strip.show();
            });
        });
    });

});