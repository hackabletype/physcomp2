'use strict';
var SerialPort = require("serialport");
var parsers = SerialPort.parsers;

var express = require('express');

var app = express();
var server = app.listen(3000);
app.use(express.static('public'));
var io = require('socket.io')(server);

var port = new SerialPort('/dev/cu.usbmodem1411', {
  baudrate: 9600,
  parser: parsers.readline('\r\n')
});

//expose the local public folder for inluding files js, css etc..
app.use(express.static('public'));

//Serve index.html when some make a request of the server
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

port.on('open', function() {
    console.log('Port open');
});

port.on('data', function(data) {
    io.sockets.emit('data', {
        val: data
    });
    console.log(data);
});
