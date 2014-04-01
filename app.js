
/**
 * Module dependencies.
 */

var http = require('http')
  , nowjs   = require('now')
  , path = require('path')
  , fs = require('fs')
  , lame = require('lame')
  , Speaker = require('speaker');

var server = http.createServer(function (request, response) {
  soundAlert()
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.end("Hello World\n");
});
var everyone = nowjs.initialize(server);

server.listen(8000, function(){
  console.log("Server listening on port " + 8000);
});

everyone.now.distributeMessage = function(msg){
    everyone.now.receiveMessage(msg);
}

nowjs.on('connect', function(){
    //Update the current set of users when someone joins
    console.log("Client joined...");
});

function soundAlert(){
  fs.createReadStream('flute.mp3')
    .pipe(new lame.Decoder())
    .on('format', function (format) {
      this.pipe(new Speaker(format));
    });
}