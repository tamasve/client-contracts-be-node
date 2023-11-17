/**
 * THE BACK-END PART OF my 1st main JS full-stack project
 * 26-27 Oct, 8-13 Nov 2023
 * Last mod.: 13 Nov 2023
 */

require('dotenv').config();

const express = require("express");
const app = express();

const cookieParser = require('cookie-parser');

const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');

const clientsLoader = require('./utilities/clientsLoader');
const contractsLoader = require('./utilities/contractsLoader');
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

// Non-authenticated routes

app.use('^/$', (req, res) => res.status(200).send("Root page"));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

// Authenticated routes

app.use('/clients', require('./routes/clients'));
app.use('/contracts', require('./routes/contracts'));
app.use('/users', require('./routes/users'));
app.use('/roles', require('./routes/roles'));
app.all("*", (req, res) => res.status(404).json({ error: "404 Page or Data Not Found" }));


// -- After DB CONNECTION, SERVER START...

mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");

    // -- Init. DATA LOADINGS from Excel for the first time --
    clientsLoader();
    // contractsLoader();
    app.listen(PORT, () => console.log(`Clients-contracts server running on port ${PORT}`));
})
