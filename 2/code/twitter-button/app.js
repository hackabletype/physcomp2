//Import Twitter and J5 modules
var Twitter = require('twitter')
var five = require("johnny-five");
var temperature;

// Authenticates with Twitter using the (unofficial) twitter
// package on npm. This is required for using the interesting parts
// of the API, e.g. streaming or posting tweets.
var client = new Twitter({
    consumer_key: 'Le0Bzk2sZasLPSykoIb5bPatt',
    consumer_secret: 'coJ9wlfgReQD2LgE6belB8Tny7Zfd22gFuzTqcd9fMPpkADFwU',
    access_token_key: '3035181914-VME7BypNiMqm9NF2XVb2Io5NMtvw0gjK9J7b0fx',
    access_token_secret: 'zURmUcaLzfcO4YxNmQAgzXve6brsE8xUJSpjCbUFHYke0'
})


//nice date format function
function getDate() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    sec = (sec < 10 ? "0" : "") + sec;

    var str = date.getFullYear() + "-" + month + "-" + day + "_" + hour + ":" + min + ":" + sec;

    return str;
}

//set up a new j5 board
var board = new five.Board();


board.on("ready", function() {

    button = new five.Button({
        pin: 2,
        isPullup: true
    });

    button.on("press", function() {
        var time = Date.now();
        client.post('statuses/update', {
            status: 'Hello Internet! ' + getDate()
        }, function(err, tweets) {
            if (err) throw new Error(err[0].message)
            console.log('Tweeted successfully!')
        });
    });
});