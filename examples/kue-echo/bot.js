var yowl = require('yowl');
var Queue = require('yowl-jobs-kue');
var bot = yowl();

bot.name = "Echo Bot";

var local = require('yowl-platform-cli');
bot.extend(local);

var queue = Queue({
  platforms: [local]
});
bot.extend(queue);

queue.process('echo', function(context, event, done) {
  event.send(event.job.data.message);
  done();
});

bot.use(function(context, event) {
  var message = event.message;
  context.createJob('echo', { message: message })
    .delay(1*1000)
    .save();
});

bot.run();
