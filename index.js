var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var cool = require('cool-ascii-faces');
var db = require('./db');

var payments = require('./payments');
var customers = require('./customers');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
    response.render('pages/index');
});

app.get('/generateCardToken', function (request, response) {
    response.render('pages/card-token.ejs', {publicKey: process.env.SIMPLIFY_API_PUBLIC_KEY});
});

app.get('/cool', function (request, response) {
    response.send(cool());
});

function errorResponse(response, error) {
    response.status(500).send(error);
}

app.get('/db', function (request, response) {
    db.runQuery('SELECT * FROM test_table', function (error, result) {
        if (!error) {
            response.render('pages/db', {results: result.rows});
        }
        else {
            response.send("Error " + error);
        }
    });
});

app.get('/payments', payments.listPayments);

app.post('/pay', function (request, response) {
    payments.create(request.body.amount, request.body.description, request.body.customer, function (data) {
        if (data.id) {
            db.runQuery("insert into payments(id, amount, status) values($1, $2, $3)", [data.id, request.body.amount, data.paymentStatus], function (error, result) {
                if (!error) {
                    response.json(data);
                }
            })
        }
        else {
            errorResponse(response, "Error making payment!");
        }
    })
});

app.get('/customers', customers.listCustomers);

app.post('/addCustomer', function (request, response) {
    console.log("###### request.body.token = ", request.body.token);
    customers.create(request.body.name, request.body.email, request.body.token, function (data) {
        if (data.id) {
            db.runQuery("insert into customers(id, name, email) values($1, $2, $3)", [data.id, request.body.name, request.body.email], function (error, result) {
                if (!error) {
                    response.json(data);
                }
                else {
                    errorResponse(response, "Error creating customers!");
                }
            })
        }
    })
});

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});


