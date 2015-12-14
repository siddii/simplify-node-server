var simplifyClient = require('./simplify').client;
var db = require('./db');
var async = require('async');

exports.create = function (amount, description, customer, cb) {
    simplifyClient.payment.create({
        amount: amount,
        description: description,
        customer: customer,
        currency: "USD"
    }, function (error, data) {
        if (error) {
            console.error(JSON.stringify(error.data));
            cb(error);
        }
        cb(data);
    });
};

function getPayment(id, cb) {
    simplifyClient.payment.find(id, function (error, data) {
        if (error) {
            console.error(JSON.stringify(error.data));
            cb(true, error);
        }
        cb(false, data);
    });
}

exports.listPayments = function (request, response) {
    db.runQuery('SELECT * FROM payments', null, function (error, result) {
        if (!error && result.rows) {
            var responseArray = [];
            async.forEachSeries(result.rows, function iterator(item, callback) {
                getPayment(item.id, function (error, data) {
                    if (!error) {
                        responseArray.push(data);
                    }
                    callback(error);
                })
            }, function done() {
                response.json(responseArray);
            });
        }
        else {
            response.status(500).send("Error listing payments!");
        }
    });
};

