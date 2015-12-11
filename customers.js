var simplify = require('./simplify');

exports.create = function (amount, cb) {
    simplify.client.payment.create({
        amount: amount,
        description: "Node.js Sample Payment",
        card: {
            expMonth: "11",
            expYear: "19",
            cvc: "123",
            number: "5555555555554444"
        },
        currency: "USD"
    }, function (error, data) {
        if (error) {
            console.error(JSON.stringify(error.data));
            cb(error);
        }
        cb(data);
    });
};

