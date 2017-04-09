/* Imports */
var Twit            = require('twit')
var twit_options    = require('./twitter_auth.json');
var notmail_options = require('./notmail_auth.json');
var request         = require('request');

/* Options */
twit_options.timeout_ms = 60*1000;
var msg = { dest: {user: notmail_options.user}, msg: {} }

/* Main */
var T = new Twit(twit_options)
var stream = T.stream('statuses/filter', { track: '#notMAIL' })
stream.on('tweet', function (tweet) {
    let newTweet = `New #notMAIL Tweet!!
    * Autor del Tweet: ${tweet.user.name} (@${tweet.user.screen_name})
    * Tweet: ${tweet.text}
    * URL: https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    msg.msg.title = 'Nuevo tweet de @' + tweet.user.screen_name + "!"
    msg.msg.data = newTweet;
    request.post({
        url: notmail_options.url+'/app/msg/?unique_id='+notmail_options.unique_id+'&shared_key='+notmail_options.shared_key,
        json: true,
        body: msg
    }, function(data){ })
})
