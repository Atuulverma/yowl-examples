var yowl = require('yowl');
var bot = yowl();

bot.name = "Echo Bot";

var local = require('yowl-platform-cli');
bot.extend(local);

bot.use(function(context, event, callback) {
  var message = event.message;
  event.send(message, callback);
});

bot.run();
