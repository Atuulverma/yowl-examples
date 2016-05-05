var yowl = require('yowl');
var bot = yowl();

bot.name = "Echo Bot";

var local = require('yowl-platform-cli');
var lock = require('yowl-lock-redis');

bot.extend(local);

bot.use(lock([{}], {}, "Don't bother me while I'm echoing!"));

var num_echoes = 10;
var echo_delay = 500;
bot.use(function(context, event, next) {
  var message = event.message;
  var echoes_left = num_echoes;
  var echo = function() {
    event.send(message, function() {
      if (echoes_left-- > 0) {
        setTimeout(echo, echo_delay);
      } else {
        next();
      }
    });
  };
  setTimeout(echo, echo_delay);
});

bot.run();
