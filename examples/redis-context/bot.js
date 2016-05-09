var yowl = require('yowl');
var bot = yowl();

bot.display_name = "Redis Context Bot";

var local = require('yowl-platform-cli');
bot.extend(local);

var redisContext = require('yowl-context-redis');
bot.use(redisContext());

bot.use(function(context, event, callback) {
  var message;
  if (context.session.previous_message) {
    message = 'The last thing you said to me was "' + context.session.previous_message + '"';
  } else {
    message = "No previous message to repeat";
  }
  context.session.previous_message = event.message;
  event.send(message, callback);
});

bot.run();
