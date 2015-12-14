var Simplify = require("simplify-commerce");


exports.client = Simplify.getClient({
    publicKey: process.env.SIMPLIFY_API_PUBLIC_KEY,
    privateKey: process.env.SIMPLIFY_API_PRI
});
