var request = require('request');
const blizzard = require('blizzard.js').initialize({ apikey: "APIKEY" });
var BlizzURL = 'https://eu.api.battle.net';
var fs = require('fs');
var notmail_options = require('./notmail_auth.json');
var url;
var auction;
var id = 22786;
var minPrice = 50000;
var msg = { dest: {user: notmail_options.user}, msg: {} }


/*setInterval(function(){
}, 10000);*/

blizzard.wow.auction({ origin: "eu", realm: "c'thun", locale: 'es_ES', jsonp: ''})
  .then(response => {

    //console.log(response.data.files[0].url);
    url = response.data.files[0].url;

    //request(url).pipe(fs.createWriteStream('auction.json'));
    request.get({url:url, json: true}, function(error, response, body){
       let result = response.body.auctions.filter( function(item){
         return item.item == id && item.buyout <= minPrice;
       });

       if(result.length != 0){
         //console.log(result);
         msg.msg.title = 'Nuevo objeto';
         msg.msg.data = 'Existen ' + result.length + ' resultados en la subasta para el objeto con ID ' + id + ' por debajo de ' + minPrice + ' oros.';
         request.post({
             url: notmail_options.url+'/app/msg/?unique_id='+notmail_options.unique_id+'&shared_key='+notmail_options.shared_key,
             json: true,
             body: msg
         }, function(data){ })

       }
    });
  });
