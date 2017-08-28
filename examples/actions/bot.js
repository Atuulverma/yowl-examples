var yowl = require('yowl');
var bot = yowl();

bot.name = "Action Bot";

var local = require('yowl-platform-cli');
bot.extend(local);

bot.use(function(context, event, callback) {
  if (event.action) {
    event.send("You responded with the action: " + event.action)
  }
  event.send({
    message: "Just a simple bot with some actions",
    actions: [
      "String Action",
      {
        title: "Object Action",
        payload: "{payload}"
      },
      {
        title: "URL Action",
        url: "https://github.com/brianbrunner/yowl"
      }
    ]
  }, callback);
});

bot.run();
