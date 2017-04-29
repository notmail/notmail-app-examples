var app = require('express')();

app.use(require('body-parser').json());
app.post('/', function (req, res) {
    res.status(200).end();
});

app.listen(4321, function () { });