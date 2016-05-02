var yowl = require('yowl');
var bot = yowl();

bot.name = "Echo Bot";

var local = require('yowl-platform-cli');
bot.extend(local);

var rethink = require('yowl-context-rethink');
bot.use(rethink());

bot.use(function(context, event, callback) {
  var message;
  if (context.session.previous_message) {
    message = 'The last thing you said to me was "' + context.session.previous_message + '"';
  } else {
    message = "No previous message to repeat";
  }
  context.session.previous_message = event.message;
  event.send(context, event, message, callback);
});

bot.run();
