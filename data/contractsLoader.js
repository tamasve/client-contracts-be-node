const readXlsxFile = require('read-excel-file/node');
const path = require("path");
const fsPromises = require('fs').promises;
const contractsData = require('./contractsData.json');
const arrrows2arrobj = require('../utilities/arrrows2arrobj');


// -- Load contracts data from an Excel file --

const contractsLoader = async () => {

    if (contractsData.length === 0) {       // it loads only if there's no record at all
    
        console.log("Load contracts data...")

        // normal xlsx read, then an own converter to json:
        const rows = await readXlsxFile(path.join(__dirname, "contracts.xlsx"));
        
        // convert to json
        let table = arrrows2arrobj(rows);

        // write json into file
        try {
            await fsPromises.writeFile( path.join(__dirname, "contractsData.json"), JSON.stringify(table));
            console.log("contracts data written into file successfully")
        } catch (err) {
            console.log(err)
        };

    }

}

module.exports = contractsLoader;