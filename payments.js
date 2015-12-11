var Simplify = require("simplify-commerce"),
    client = Simplify.getClient({
        publicKey: 'sbpb_M2IxNWFiOTUtMzAzNC00YzA2LWI3N2MtYjNlNjFhMGExYWFm',
        privateKey: 'iXGIOjiCFLMWs8pWwUR1KMbh4ykNmz+0Wl9LdZYOr9V5YFFQL0ODSXAOkNtXTToq'
    });

exports.create = function (amount, cb) {
    console.log("#### amount = ", amount);
    client.payment.create({
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

