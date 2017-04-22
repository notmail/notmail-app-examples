/* Imports */
var Tail            = require('tail').Tail;
var notmail_options = require('./notmail_auth.json');
var request         = require('request');

/* Options */
var msg = { dest: {user: notmail_options.user}, msg: {} };
var buffer = "";

/* Main */
tail = new Tail("/var/log/sudo.log", {separator: /[\r]{0,1}\n/});
tail.on("line", function(data) {
    buffer += data + '\n';
    if(buffer.match(/COMMAND/)){
        msg.msg.title   = 'Nuevo log de ->' + (buffer.match(/ \: (.+) \: /)[1] || 'Unknown') + '<-'
        msg.msg.data    = buffer; 
        request.post({
                url: notmail_options.url+'/app/msg/?unique_id='+notmail_options.unique_id+'&shared_key='+notmail_options.shared_key, json: true, body: msg }, function(data){ })
        buffer = "";
    }
});
