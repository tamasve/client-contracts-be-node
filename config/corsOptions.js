// CORS = Cross Origin Resource Sharing - 3rd party middleware

const allowedOrigins = require("./allowedOrigins");     // import whitelist

// options object for CORS: a handler function and a status code
const corsOptions = {
    origin: (origin, callback) => {
        console.log(`request origin: ${origin}`)
        if (allowedOrigins.indexOf(origin) !== -1 || !origin)  callback(null, true);     // origin is on the whitelist OR origin = undefined
        // else callback(new Error("Not allowed by CORS"));
        else callback("URL not allowed by CORS", false);
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;