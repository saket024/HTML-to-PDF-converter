var express = require('express');
var bodyParser = require('body-parser');
var pdf = require('html-pdf');
var fs = require('fs');
var options = { format: 'A4' };

var app = express();
var port = process.env.PORT || 3000;
app.listen(port, () => console.log('server run at port ' + port));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('home')
});

app.post('/', (req, res) => {
    res.render('sample-pdf', { data: req.body.article }, function (err, html) {
        pdf.create(html, options).toFile('./public/uploads/sample-pdf.pdf', function (err, result) {
            if (err) {
                return console.log(err);
            }
            else {
                var datafile = fs.readFileSync('./public/uploads/sample-pdf.pdf');
                res.header('content-type', 'application/pdf');
                res.send(datafile);
            }
        });
    })
})