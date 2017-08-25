var yowl = require('yowl');
var parseDates = require('yowl-parse-dates')
var bot = yowl();

bot.name = "Echo Bot";

var local = require('yowl-platform-cli');
bot.extend(local);

bot.use(parseDates);

/**
 * Parses dates/date ranges from messages and sends them back.
 * Valid message strings are described in the documentation for chrono.
 * https://github.com/wanasit/chrono
 */

bot.use(function(context, event) {
  var dates = event.parseDates();
  dates.forEach(function(date) {
    var response = date.start.date().toISOString()
    if (date.end) {
      response += ' to ' + date.end.date().toISOString()
    }
    event.send(response);
  });
});

bot.run();
