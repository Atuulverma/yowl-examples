var yowl = require('yowl');
var bot = yowl();

bot.name = "Echo Bot";

var local = require('yowl-platform-cli');
bot.extend(local);

var memory = require('yowl-session-memory');
bot.use(memory);

var DialogManager = require('yowl-dialog-manager')();

DialogManager.add('greet', {
  test: function(context, event) {
    return !context.session.greeted;
  },
  messages: [
    "Hello there!",
    "This an example of a multi-step dialog.",
    "As a note, chaining dialogs between multiple interactions requires a persisted context.",
    "This dialog is an overly complicated echo example."
  ],
  after: function(context, event, callback) {
    context.session.greeted = true;
    DialogManager.dialogs.step_1.play(context, event, callback);
  }
});

DialogManager.add('step_1', {
  messages: [
    "What is the message that you'd like me to echo back?"
  ],
  onresponse: function(context, event, callback) {
    context.session.echo = event.message;
    DialogManager.dialogs.step_2.play(context, event, callback);
  }
});

DialogManager.add('step_2', {
  messages: [
    "You told me to echo \"{echo}\""
  ],
  after: function(context, event, callback) {
    delete context.session.echo;
    DialogManager.dialogs.step_1.play(context, event, callback);
  }
});

bot.use(DialogManager);

bot.run();
