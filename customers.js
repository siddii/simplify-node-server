var simplify = require('./simplify');
var db = require('./db');
var async = require('async');


exports.create = function (name, email, cardToken, cb) {
    console.log("Public Key: " + simplify.client.public_key);
    simplify.client.customer.create({
        name: name,
        email: email,
        token: cardToken
    }, function (error, data) {
        if (error) {
            console.error(JSON.stringify(error.data));
            cb(error);
        }
        cb(data);
    });
};

function getCustomer(id, cb) {
    simplify.client.customer.find(id, function (error, data) {
        if (error) {
            console.error(JSON.stringify(error.data));
            cb(true, error);
        }
        cb(false, data);
    });
}

exports.listCustomers = function (request, response) {
    db.runQuery('SELECT * FROM customers', null, function (error, result) {
        if (!error && result.rows) {
            var responseArray = [];
            async.forEachSeries(result.rows, function iterator(item, callback) {
                getCustomer(item.id, function (error, data) {
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
            response.status(500).send("Error listing customers!");
        }
    });
};


