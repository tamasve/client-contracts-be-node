const readXlsxFile = require('read-excel-file/node');
const path = require("path");
const Contract = require('../model/Contract');
const arrrows2arrobj = require('./arrrows2arrobj');


// -- Load contracts data from an Excel file into DB --

const contractsLoader = async () => {

    // Query DB for contracts
    const contracts = await Contract.find();
    console.log(`number of contracts in DB: ${contracts.length}`);

    if (contracts.length === 0) {       // it saves contracts only if there's no record at all
    
        console.log("Load initial contracts data...")

        // it reads xlsx as array of rows (0th is the header)
        const rowsArray = await readXlsxFile(path.join(__dirname, "..", "data", "contracts.xlsx"));
        
        // convert to an array of Contract objects
        let table = arrrows2arrobj(rowsArray);

        // save every object into DB
        table.map(
            async (contract) => {
                try {
                    const result = await Contract.create( {...contract} );
                } catch (err) {
                    console.error(err);
                }
            });

        console.log("Data loading ended")
    }

}

module.exports = contractsLoader;