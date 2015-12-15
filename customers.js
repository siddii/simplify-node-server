var simplify = require('./simplify');
var db = require('./db');
var async = require('async');


exports.create = function (name, email, token, cb) {
    console.log("#### name = ", name, email, token);
    simplify.client.customer.create({
        name: name,
        email: email,
        token: token
    }, function (error, data) {
        console.log("##### data = ", data, error);
        if (error) {
            console.error(JSON.stringify(error));
            cb(error);
        }
        cb(data);
    });
};

function getCustomer(id, cb) {
    simplify.client.customer.find(id, function (error, data) {
        if (error) {
            console.error(JSON.stringify(error));
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


