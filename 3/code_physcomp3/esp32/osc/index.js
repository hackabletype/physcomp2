var osc = require('node-osc');
                
var oscServer = new osc.Server(9999, '0.0.0.0');
oscServer.on("message", function(msg, rinfo) {
    console.log(msg);
});