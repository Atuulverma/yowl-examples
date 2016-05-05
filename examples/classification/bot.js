var yowl = require('yowl');
var bot = yowl();

bot.name = "Pizza Bot";

var local = require('yowl-platform-cli');
bot.extend(local);

var classifier = require('yowl-classifier-bayes');
var training = require('./training');
bot.use(classifier({ training: training }));

bot.use(function(context, event) {
    return context.classification == "pizza_stats";
  }, function(context, event, next) {
    var message = "You have ordered 10 pizzas totaling $100.";
    event.send(message, next.unroll);
  });

bot.use(function(context, event) {
    return context.classification == "make_order";
  }, function(context, event, next) {
    var message = "Alright, I'll get to work making your pizza.";
    event.send(message, next.unroll);
  });

bot.use(function(context, event) {
    return context.classification == "order_status";
  }, function(context, event, next) {
    var message = "Your order is on it's way.";
    event.send(message, next.unroll);
  });

bot.use(function(context, event, next) {
    var message = "I'm sorry, I didn't understand your request. I only know things about pizza.";
    event.send(message, next);
  });

bot.run();
