const readXlsxFile = require('read-excel-file/node');
const path = require("path");
const Client = require('../model/Client');
const arrrows2arrobj = require('./arrrows2arrobj');


// -- Load clients data from an Excel file into DB --

const clientsLoader = async () => {

    // Query DB for clients
    const clients = await Client.find();
    console.log(`number of clients in DB: ${clients.length}`);

    if (!clients) {       // it saves clients only if there's no record at all
    
        console.log("Load initial clients data...")

        // it reads xlsx as array of rows (0th is the header)
        const rowsArray = await readXlsxFile(path.join(__dirname, "clients.xlsx"));
        
        // convert to an array of Client objects
        let table = arrrows2arrobj(rowsArray);

        // save every object into DB
        table.map(
            async (client) => {
                try {
                    const result = await Client.create( {...client} );
                    console.log(result);
                } catch (err) {
                    console.error(err);
                }
            });
    }

}

module.exports = clientsLoader;