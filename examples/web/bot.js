var path = require('path');
var websocket = require('yowl-platform-ws');
var yowl = require('yowl');

var bot = yowl();

bot.name = 'Echo Bot';

bot.extend(websocket());

bot.use(function(context, event, callback) {
  var message = event.message;
  setTimeout(function() {
    event.send(message, callback);
  }, 500);
});

bot.app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

bot.run(5000);
console.log("Running on port 5000...");
