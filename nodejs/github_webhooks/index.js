var app             = require('express')(),
    request         = require('request');
    notmail_options = require('./notmail_auth.json'),
    msg             = { dest: {user: notmail_options.user}, msg: {} }

app.use(require('body-parser').json());
app.post('/', function (req, res) {
    msg.msg.title = 'Nueva respuesta de @' + req.body.comment.user.login + " en '" + req.body.issue.title + "' !";
    msg.msg.data = req.body.comment.user.login + " escribió: \n\n" + req.body.comment.body + "\n\nVer en: " + req.body.issue.html_url;
    res.status(200).end();
    request.post({  url: notmail_options.url+'/app/msg/?unique_id='+notmail_options.unique_id+'&shared_key='+notmail_options.shared_key, 
                    json: true, body: msg }, function(data){ })
});

app.listen(4321, function () { });