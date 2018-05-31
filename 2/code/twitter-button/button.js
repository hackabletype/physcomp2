var five = require("johnny-five"),
    button, led;

five.Board().on("ready", function() {

    button = new five.Button({
        pin: 2,
        isPullup: true
    });

    led = new five.Led(13);

    button.on("hold", function() {
        console.log("Button held");
    });

    button.on("press", function() {
        console.log("Button pressed");
        led.on();
    });

    button.on("release", function() {
        console.log("Button released");
        led.off();
    });
});