var util = require('util');

require('colors');

var _ = require('lodash');
var yahooFinance = require('yahoo-finance');

var notmail_options = require('./notmail_auth.json');
var request = require('request');
var msg = { dest: {user: notmail_options.user}, msg: {} };
var url;

var CronJob = require('cron').CronJob;
var job = new CronJob('00 00 10 * * *',function(){
  //This will repeat every day at 13:54:00
  var FIELDS = _.flatten([ ['a', 'b', 'b2', 'b3', 'p', 'o'] ]);
  var SYMBOLS = ['AAPL'];
  yahooFinance.snapshot({ fields: FIELDS, symbols: SYMBOLS})
  .then(response =>{
    console.log(response[0].open);
    msg.msg.title = 'Apertura en bolsa';
    msg.msg.data = 'El valor de la empresa ' +SYMBOLS[0]+ ' en la apertura de hoy asciende a ' +response[0].open+ '$';
    request.post({
      url: notmail_options.url+'/app/msg/?unique_id='+notmail_options.unique_id+'&shared_key='+notmail_options.shared_key,
      json: true,
      body: msg
    },function(data){})
  })
},null,true,'Europe/Madrid');

/*var FIELDS = _.flatten([ ['a', 'b', 'b2', 'b3', 'p', 'o'] ]);
var SYMBOLS = ['AAPL'];
yahooFinance.snapshot({ fields: FIELDS, symbols: SYMBOLS})
.then(response =>{
  console.log(response[0].open);
  msg.msg.title = 'Apertura en bolsa';
  msg.msg.data = 'El valor de la empresa ' +SYMBOLS[0]+ ' en la apertura de hoy asciende a ' +response[0].open+ '$';
  request.post({
    url: notmail_options.url+'/app/msg/?unique_id='+notmail_options.unique_id+'&shared_key='+notmail_options.shared_key,
    json: true,
    body: msg
  },function(data){})
})*/
