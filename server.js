/**
 * THE BACK-END PART OF MY 1st main JS full-stack project
 * 26-27, 5 Nov Oct 2023
 * Last mod.: 5 Nov 2023
 */

require('dotenv').config();

const express = require("express");
const app = express();

const cookieParser = require('cookie-parser');

const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');

const clientsLoader = require('./data/clientsLoader');
const contractsLoader = require('./data/contractsLoader');
const mongoose = require("mongoose");
const connectDB = require('./config/dbConn');

const PORT = 3500;



console.log("server.js starts")

// Connect to MongoDB (with Mongoose)
connectDB();


// -- CUSTOM MIDDLEWARE --
// app.use( credentials );     // to avoid CORS error: a special auxiliary, before CORS options (set CORS flag in req header)
app.use(cors(corsOptions));


// -- BUILT-IN MIDDLEWARE --

app.use(express.urlencoded( { extended: false } ));
app.use(express.json());
app.use(cookieParser());


// -- ROUTES --

app.use('^/$', (req, res) => res.status(200).send("Root page"));
app.use('/clients', require('./routes/api/clients'));
app.use('/contracts', require('./routes/api/contracts'));
// app.use("*", (req, res) => res.status(403).send("URL not found"));


// -- After DB CONNECTION, SERVER START...

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");

    // -- Init. DATA LOADINGS from Excel for the first time --
    clientsLoader();
    // contractsLoader();
    app.listen(PORT, () => console.log(`Clients-contracts server running on port ${PORT}`));
})
