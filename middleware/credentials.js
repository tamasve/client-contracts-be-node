// 21 July 2023
// an auxiliary: to handle a CORS problem in case of a front-end fetch()

const allowedOrigins = require('../config/allowedOrigins');

const credentials = (req, res, next) => {
    // const origin = req.headers.origin;
    // console.log(origin);
    // if (allowedOrigins.includes(origin)) {
    //     console.log("origin is OK, put flag into header...");
    //     res.header('Access-Control-Allow-Origin', true);       // if our origin is one of that list, set this flag true to avoid CORS error
    // }
    res.header('Access-Control-Allow-Origin', "http://localhost:3500/");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}

module.exports = credentials;