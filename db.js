var pg = require('pg');


exports.runQuery = function (query, params, cb) {
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
        client.query(query, params, function (err, result) {
            done();
            if (err) {
                console.error(err);
                cb(true, err);
            }
            else {
                cb(false, result);
            }
        });
    });
};
