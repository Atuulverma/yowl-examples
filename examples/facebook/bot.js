var facebook = require('../../../yowl-platform-facebook');
var memory = require('yowl-session-memory');
var yowl = require('../../../yowl');

var bot = yowl();

bot.name = 'Echo Bot';

/**
 * Facebook Platform
 *
 * You need to setup an app/page on Facebook for the facebook platform. Visit
 * https://developers.facebook.com/docs/messenger-platform/guides/quick-start
 * for more info.
 *
 * Facebook requires that the server hosting a bot be exposed to the internet.
 * If you are running this example locally, you will want to expose your local
 * server to the internet via tunneling. An easy way to do this is with 
 * ngrok. (https://ngrok.com/)
 */

bot.extend(facebook({ verificationToken: "your-verification-token",
                      accessToken: "your-access-token",
                      webhook: "/facebook/webhook/" }));

bot.use(memory);

bot.use(function(context, event) {
  return !context.session.profile;
}, function(context, event, next) {
  context.profile(function(err, profile) {
    context.session.profile = profile;
    next();
  });
});

bot.use(function(context, event, callback) {
  context.session.echo = event.message;
  setTimeout(function() {
    console.log(context.session);
    event.send("{profile.first_name} says '{echo}'", callback);
  }, 500);
});

bot.run(5000);
console.log("Running on port 5000...");
